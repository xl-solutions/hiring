import 'reflect-metadata';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { DateFnsProvider } from '../../../../shared/container/providers/DateProvider/implementations/DateFnsProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { HistoricalPriceByDateUseCase } from './HistoricalPriceByDateUseCase';

let dateFnsProvider: IDateProvider;
let historicalPriceByDateUseCase: HistoricalPriceByDateUseCase;

describe('Historical price by date', () => {
  beforeEach(() => {
    dateFnsProvider = new DateFnsProvider();
    historicalPriceByDateUseCase = new HistoricalPriceByDateUseCase(
      dateFnsProvider,
    );
  });

  it('should not be able to list historical prices without parameters', async () => {
    expect(async () => {
      const stock_name = 'AAPL';
      const from = '';
      const to = '';

      await historicalPriceByDateUseCase.execute({ stock_name, from, to });
    }).rejects.toBeInstanceOf(AppError);
  });
});
