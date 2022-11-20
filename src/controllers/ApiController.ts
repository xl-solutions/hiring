import { ApiService } from '../services/ApiService';

export class ApiController {
  constructor(private apiService = new ApiService()) {}

  async getStockBySymbol(symbol: string) {
    const result = await this.apiService.getStockBySymbol(symbol);

    const hasError = !!result['code'];

    if (hasError) {
      return result;
    } else {
      const { symbol, regularMarketPrice, regularMarketTime } = result;
      return {
        name: symbol,
        lastPrice: regularMarketPrice,
        pricedAt: new Date(Number(regularMarketTime.toString() + '000')).toISOString(),
      };
    }
  }
}
