import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';
import AppError from '@shared/errors/AppError';

let alphaVantageService: AlphaVantageService;

describe('AlphaVantageService', () => {
  beforeEach(() => {
    alphaVantageService = new AlphaVantageService();
  });

  it('should be able of running service', async () => {
    const data = {
      stock_name: 'PETR4.SA',
    };
    alphaVantageService
      .getLatest(data)
      .then(response => {
        expect(response['01. symbol']).toBe(data.stock_name);
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });

  it('should be able of running service', async () => {
    const data = {
      stock_name: 'PETR4.SA',
    };
    alphaVantageService
      .getPrices(data)
      .then(response => {
        expect(response[0]).toHaveProperty('4. close');
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });
});
