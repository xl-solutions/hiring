import importedAxios from 'axios';
import {
  YahooApiErrorObject,
  YahooApiErrorResponse,
  YahooApiSuccessResponse,
  YahooApiUsefullInfo,
} from '../utils/types/YahooApiTypes';
import { desconstructErrorObject, desconstructSuccessObject } from '../utils/YahooObjectDesconstructor';
export class ApiService {
  // Dependency injection for testing later
  constructor(private axios = importedAxios) {}

  async getStockBySymbol(stockName: string): Promise<YahooApiUsefullInfo | YahooApiErrorObject> {
    return this.axios
      .get<YahooApiSuccessResponse>(
        `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${stockName}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
      )
      .then(({ data }) => {
        return desconstructSuccessObject(data);
      })
      .catch((data: YahooApiErrorResponse) => {
        return desconstructErrorObject(data);
      });
  }
}
