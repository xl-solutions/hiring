import { AppError } from '../../../../shared/errors/AppError';
import { GetLastQuoteUseCase } from './GetLastQuoteUseCase';

let getLastQuoteUseCase: GetLastQuoteUseCase;

describe('Get last quote from stock', () => {
  beforeEach(() => {
    getLastQuoteUseCase = new GetLastQuoteUseCase();
  });

  it('should not be able to list last quote without stock name', async () => {
    expect(async () => {
      const stock_name = '';
      await getLastQuoteUseCase.execute({ stock_name });
    }).rejects.toBeInstanceOf(AppError);
  });
});
