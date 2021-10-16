import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';
import AppError from '@shared/errors/AppError';
import HistoryService from './HistoryService';

let alphaVantageService: AlphaVantageService;
let historyService: HistoryService;

describe('HistoryService', () => {
  beforeEach(() => {
    alphaVantageService = new AlphaVantageService();
    historyService = new HistoryService(alphaVantageService);
  });

  it('should be able of running service with success', async () => {
    const data = {
      stock_name: 'PETR4.SA',
      to: '2016-05-02',
      from: '2016-05-03',
    };

    const response = await historyService
      .execute(data)
      .then(response => {
        expect(response.name).toBe(data.stock_name);
        expect(response).toHaveProperty('prices');
      })
      .catch(async error => {
        await expect(error).toBeInstanceOf(AppError);
      });
  });

  it('should not be able of running service', async () => {
    const data = {
      stock_name: 'PETR4.SA',
      to: '2016-05-2',
      from: '2016-05-03',
    };

    await expect(historyService.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
