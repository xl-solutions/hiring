import { Readable } from 'stream';
import byline from 'byline';
import { AlphaVantageApiService } from '../../../services/AlphaVantageApiService';
import fs from 'fs';
function getDefaultResponseForMockedAlphaApi() {
  const stream = fs.createReadStream(__dirname + '/AlphaReturnExample.json');
  return byline(stream);
}

export function getMoockedAlphaService(): AlphaVantageApiService {
  const moockedAlphaService = {
    getStockLimitedHistoryBySymbol: async (stock_name: string) => {
      return getDefaultResponseForMockedAlphaApi();
    },
  } as unknown as AlphaVantageApiService;
  return moockedAlphaService;
}
