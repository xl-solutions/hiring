import axios, { AxiosInstance } from 'axios'

import Quotation from '../interfaces/Quotation'
import History from '../interfaces/Pricing'
import LastPrices from '../interfaces/LastPrice'
import Gain from '../interfaces/Gain'

import transformQuotation from '../transforms/quotation'
import transformHistoricalPrice from '../transforms/historicalPrice'
import transformComparison from '../transforms/comparison'
import transformGains from '../transforms/gains'

import dateUtils from '../utils/date'

class StocksService {
  private client: AxiosInstance

  public constructor() {
    this.client = axios.create({
      baseURL: `https://www.alphavantage.co/query?apikey=${process.env.ALPHAVANTAGE_KEY}`
    })
  }

  public async fetchRecentQuotation(stockName: string): Promise<Quotation> {
    const data = await this.globalQuote(stockName)

    if (this.successfulResponse(data)) {
      const quotation = transformQuotation(data)
      return quotation
    }

    throw new Error(this.getErrorMessage(data))
  }

  public async fetchHistoricalSharePrice(stockName: string, from: string, to: string): Promise<History> {
    const data = await this.timeSeriesDaily(stockName, 'full')

    if (this.successfulResponse(data)) {
      const historical = transformHistoricalPrice(data, from, to)
      return historical
    }

    throw new Error(this.getErrorMessage(data))
  }

  public async stocksCompare(stockName: string, stocks: Array<string>): Promise<LastPrices> {
    const promises = [stockName, ...stocks].map(async (stock) => {
      const data = await this.globalQuote(stock)
      return data
    })

    const data = await Promise.all(promises)

    const comparison = transformComparison(data)
    if (!comparison.lastPrices.length) {
      const [errorMessage] = data.map((item) => this.getErrorMessage(item))
      throw new Error(errorMessage)
    }

    return comparison
  }

  public async gains(stockName: string, purchasedAmount: number, purchasedAt: string): Promise<Gain> {
    const data = await this.timeSeriesDaily(stockName, 'full')

    if (this.successfulResponse(data)) {
      const quotations = data['Time Series (Daily)']
      const quotationToday = this.getQuotationOn(quotations, dateUtils.toISODate())
      const quotationOnPurchasedDay = this.getQuotationOn(quotations, purchasedAt)
      const capitalGains = this.calculateGains(quotationOnPurchasedDay, quotationToday, purchasedAmount)
      const capitalGainsInBrl = await this.convertToBrl(stockName, capitalGains)

      const gains = transformGains({
        stockName,
        quotationToday,
        quotationOnPurchasedDay,
        purchasedAmount,
        purchasedAt,
        capitalGains: capitalGainsInBrl
      })

      return gains
    }

    throw new Error(this.getErrorMessage(data))
  }

  private async globalQuote(stockName: string): Promise<object> {
    const { data } = await this.client.get(`&function=GLOBAL_QUOTE&symbol=${stockName}`)
    return data
  }

  private async timeSeriesDaily(stockName: string, outputSize: string): Promise<object> {
    const { data } = await this.client.get(`&function=TIME_SERIES_DAILY&symbol=${stockName}&outputsize=${outputSize}`)
    return data
  }

  private async exchangeRates(fromCurrency: string, toCurrency: string): Promise<object> {
    const { data } = await this.client.get(`&function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}`)
    return data
  }

  public calculateGains(quotationOnPurchasedDay: object, quotationToday: object, purchasedAmount: number): number {
    const valueOnTheDateOfPurchase = Number(quotationOnPurchasedDay['4. close']) * purchasedAmount
    const valueToday = Number(quotationToday['4. close']) * purchasedAmount

    return valueToday - valueOnTheDateOfPurchase
  }

  public getQuotationOn(data: object, purchasedAt: string): object {
    if (!this.quotationExists(data, purchasedAt)) {
      throw new Error('Stocks not exists in purchased date')
    }

    if (data[purchasedAt]) {
      return data[purchasedAt]
    }

    const purchasedDate = new Date(purchasedAt)
    const lastQuotationTimestamp = purchasedDate.setDate(purchasedDate.getDate() - 1)
    const lastQuotationDay = dateUtils.toISODate(lastQuotationTimestamp)

    if (data[lastQuotationDay]) {
      return data[lastQuotationDay]
    }

    return this.getQuotationOn(data, lastQuotationDay)
  }

  public quotationExists(data: object, purchasedAt: string): boolean {
    const firstDate = Object.keys(data)[Object.keys(data).length - 1]

    const purchasedDate = new Date(purchasedAt)
    const oldQuotationDate = new Date(firstDate)

    return oldQuotationDate.getTime() <= purchasedDate.getTime()
  }

  public async convertToBrl(stockName: string, gains: number): Promise<number> {
    if (!stockName.toUpperCase().includes('.SA')) {
      const exchange = await this.exchangeRates('USD', 'BRL')
      const exchangeRate = exchange['Realtime Currency Exchange Rate']['5. Exchange Rate']

      return Number(gains.toFixed(2)) * Number(Number(exchangeRate).toFixed(2))
    }

    return Number(gains.toFixed(2))
  }

  private successfulResponse(data: object): boolean {
    return !data.Note && !data['Error Message']
  }

  private getErrorMessage(data: object): string {
    return data.Note || data['Error Message'] || 'Unknown error'
  }
}

export default new StocksService()
