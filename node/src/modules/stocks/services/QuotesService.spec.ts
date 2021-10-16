import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';
import AppError from '@shared/errors/AppError';
import QuotesService from './QuotesService';

let alphaVantageService: AlphaVantageService;
let quotesService: QuotesService;

describe('QuotesService', () => {
  beforeEach(() => {
    alphaVantageService = new AlphaVantageService();
    quotesService = new QuotesService(alphaVantageService);
  });

  it('should be able of running service with success', async () => {
    const data = {
      stock_name: 'PETR4.SA',
    };

    quotesService
      .execute(data)
      .then(response => {
        expect(response).toHaveProperty('name');
        expect(response).toHaveProperty('lastPrice');
        expect(response).toHaveProperty('pricedAt');
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });

  it('should not be able of running service', async () => {
    const data = {
      stock_name: 'PETR4.SA',
    };

    await expect(quotesService.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
