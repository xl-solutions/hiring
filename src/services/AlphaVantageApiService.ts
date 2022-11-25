import importedAxios from 'axios';
import byline from 'byline';
import fs from 'fs';

export class AlphaVantageApiService {
  // Dependency injection for testing later
  constructor(private axios = importedAxios) {}

  async getStockLimitedHistoryBySymbol(stock_name: string, from: Date, to: Date) {
    return this.axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_name}&outputsize=compact&apikey=${process.env.API_KEY}`,
        { responseType: 'stream' }
      )
      .then(({ data }) => {
        return byline(data);
      });
  }
}
