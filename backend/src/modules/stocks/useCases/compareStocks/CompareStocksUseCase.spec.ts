import { AppError } from '../../../../shared/errors/AppError';
import { CompareStocksUseCase } from './CompareStocksUseCase';

let compareStocksUseCase: CompareStocksUseCase;

describe('Compare stocks', () => {
  beforeEach(() => {
    compareStocksUseCase = new CompareStocksUseCase();
  });

  it('should not be able to list last price for stocks', async () => {
    expect(async () => {
      const stock_name = 'AAPL';
      const stocks = [];

      await compareStocksUseCase.execute({ stock_name, stocks });
    }).rejects.toBeInstanceOf(AppError);
  });
});
