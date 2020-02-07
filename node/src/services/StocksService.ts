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

    if (this.successfulResponse(data)) {
      const quotation = transformQuotation(data)
      return quotation
    }

    throw new Error(this.getErrorMessage(data))
  }

  public async fetchHistoricalSharePrice(stockName: string, from: string, to: string): Promise<History> {
    const { data } = await this.client.get(`query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${process.env.ALPHAVANTAGE_KEY}&outputsize=full`)

    if (this.successfulResponse(data)) {
      const historical = transformHistoricalPrice(data, from, to)
      return historical
    }

    throw new Error(this.getErrorMessage(data))
  }

  private successfulResponse(data): boolean {
    return !data.Note && !data['Error Message']
  }

  private getErrorMessage(data): string {
    return data.Note || data['Error Message'] || 'Unknown error'
  }
}

export default new StocksService()
