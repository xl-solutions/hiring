import { AxiosStatic } from 'axios';
import { YahooApiService } from '../../services/YahooApiService';
import { defaultResponseForAxios, getMockedAxios } from '../utils/mockAxios';

describe('YahooApiService', () => {
  test('YahooApiService - should return not found if result doesnt have all necessary parameters', async () => {
    const mockedAxios = getMockedAxios(true);
    const yahooApiService = new YahooApiService(mockedAxios);

    expect(yahooApiService.getStockBySymbol('ibm')).rejects.toMatchObject({ code: 'Not Found' });
  });

  test('YahooApiService - should return desconstructed parameters if everything goes ok', async () => {
    const mockedAxios = getMockedAxios(false);
    const yahooApiService = new YahooApiService(mockedAxios);

    expect(yahooApiService.getStockBySymbol('ibm')).resolves.toMatchObject(defaultResponseForAxios);
  });
});
