import { YahooApiService } from '../../services/YahooApiService';
import { YahooApiUsefullInfo } from '../../utils/types/YahooApi/YahooApiTypes';

export const defaultResponseForMockedYahooApi: YahooApiUsefullInfo = {
  symbol: 'IBM',
  regularMarketPrice: 12.02,
  regularMarketTime: new Date('2000-01-01').valueOf(),
};

export function getMoockedYahooService(): YahooApiService {
  const moockedYahooService = {
    getStockBySymbol: async (stock_name: string) => {
      if (stock_name === 'ibm') return defaultResponseForMockedYahooApi;
      throw { code: 'Not Found' };
    },
  } as unknown as YahooApiService;
  return moockedYahooService;
}
