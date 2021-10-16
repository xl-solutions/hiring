import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';
import AppError from '@shared/errors/AppError';
import GainsService from './GainsService';

let alphaVantageService: AlphaVantageService;
let gainsService: GainsService;

describe('GainsService', () => {
  beforeEach(() => {
    alphaVantageService = new AlphaVantageService();
    gainsService = new GainsService(alphaVantageService);
  });

  it('must be able to run the service, returning an error when an internal error has occurred in the services', async () => {
    const data = {
      stock_name: 'PETR4.SA',
      purchasedAmount: '100',
      purchasedAt: '2016-05-02',
    };

    gainsService
      .execute(data)
      .then(response => {
        expect(response.name).toBe(data.stock_name);
        expect(response.purchasedAmount).toBe(data.purchasedAmount);
        expect(response.purchasedAt).toBe(data.purchasedAt);
        expect(response).toHaveProperty('priceAtDate');
        expect(response).toHaveProperty('lastPrice');
        expect(response).toHaveProperty('capitalGains');
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });

  it('should not be able of running service', async () => {
    const data = {
      stock_name: 'INVALID_STOCK_NAME',
      purchasedAmount: '100',
      purchasedAt: '2016-05-02',
    };

    await expect(gainsService.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
