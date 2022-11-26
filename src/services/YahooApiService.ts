import importedAxios from 'axios';
import {
  YahooApiErrorResponse,
  YahooApiSuccessResponse,
  YahooApiUsefullInfo,
} from '../utils/types/YahooApi/YahooApiTypes';
import { desconstructErrorObject, desconstructSuccessObject } from '../utils/types/YahooApi/YahooObjectDesconstructor';
export class YahooApiService {
  // Dependency injection for testing later
  constructor(private axios = importedAxios) {}

  async getStockBySymbol(stockName: string): Promise<YahooApiUsefullInfo> {
    return this.axios
      .get<YahooApiSuccessResponse>(
        `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${stockName}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
      )
      .then(({ data }) => {
        // Some of the data are incomplete and do not return the price.
        // So I'm duckTyping it out as a NotFound Error

        const { regularMarketTime, regularMarketPrice, symbol } = desconstructSuccessObject(data);
        const hasEveryInfo: boolean = Boolean(regularMarketPrice) && Boolean(regularMarketTime) && Boolean(symbol);

        if (hasEveryInfo) {
          return { regularMarketTime, regularMarketPrice, symbol };
        }
        //duck typing
        throw 'DuckType';
      })
      .catch((data: YahooApiErrorResponse | string) => {
        if (typeof data === 'string') {
          throw { code: 'Not Found' };
        }

        throw desconstructErrorObject(data);
      });
  }
}
