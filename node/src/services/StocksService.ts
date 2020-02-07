import axios, { AxiosInstance } from 'axios'

import Quotation from '../interfaces/Quotation'
import History from '../interfaces/Pricing'
import transformQuotation from '../transforms/quotation'
import transformHistoricalPrice from '../transforms/historicalPrice'

class StocksService {
  private client: AxiosInstance

  public constructor() {
    this.client = axios.create({
      baseURL: 'https://www.alphavantage.co/'
    })
  }

  public async fetchRecentQuotation(stockName: string): Promise<Quotation> {
    const { data } = await this.client.get(`query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.ALPHAVANTAGE_KEY}`)
    const quotation = transformQuotation(data)

    return quotation
  }

  public async fetchHistoricalSharePrice(stockName: string, from: string, to: string): Promise<History> {
    const { data } = await this.client.get(`query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${process.env.ALPHAVANTAGE_KEY}&outputsize=full`)
    const historical = transformHistoricalPrice(data, from, to)

    return historical
  }
}

export default new StocksService()
