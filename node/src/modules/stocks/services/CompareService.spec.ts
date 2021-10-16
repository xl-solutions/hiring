import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';
import AppError from '@shared/errors/AppError';
import CompareService from './CompareService';
import QuotesService from './QuotesService';

let alphaVantageService: AlphaVantageService;
let compareService: CompareService;
let quotesService: QuotesService;

describe('CompareService', () => {
  beforeEach(async () => {
    alphaVantageService = new AlphaVantageService();
    compareService = new CompareService();
    quotesService = new QuotesService(alphaVantageService);
  });

  it('must be able to run the service, returning an error when an internal error has occurred in the services', async () => {
    const data = {
      stock_name: 'USIM5.SA',
      stocks: ['TIMP3.SA', 'VIVT4.SA'],
    };

    compareService
      .execute(data)
      .then(async response => {
        expect(response.lastPrices[0].name).toBe(data.stocks[0]);
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });

  it('should be able of return error case invalid stock name', async () => {
    const data = {
      stock_name: 'PETR4.SA',
      stocks: ['INVALID_STOCK_NAME', 'VIVT4.SA'],
    };

    await expect(compareService.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
