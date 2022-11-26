import importedAxios from 'axios';
import byline from 'byline';
import { requiredEnv } from '../utils/Env';

export class AlphaVantageApiService {
  // Dependency injection for testing later
  constructor(private axios = importedAxios) {}

  async getStockLimitedHistoryBySymbol(stock_name: string) {
    return this.axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_name}&outputsize=full&apikey=${requiredEnv(
          process.env.API_KEY
        )}`,
        { responseType: 'stream' }
      )
      .then(({ data }) => {
        return byline(data);
      });
  }
}
