import axios, { AxiosInstance } from 'axios'
import Quotation from '../interfaces/Quotation'
import transform from '../transforms/quotation'

class StocksService {
  private client: AxiosInstance

  public constructor() {
    this.client = axios.create({
      baseURL: 'https://www.alphavantage.co/'
    })
  }

  public async fetchRecentQuotation(stockName: string): Promise<Quotation> {
    const { data } = await this.client.get(`query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.ALPHAVANTAGE_KEY}`)
    const quotation = transform(data)

    return quotation
  }
}

export default new StocksService()
