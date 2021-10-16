import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IAlphaVantageDTO } from '@modules/alphavantage/entities/IAlphaVantageDTO';
import {
  IRequest,
  IQuotes,
  IQuotesDTO,
} from '@modules/stocks/entities/IQuotesDTO';

@injectable()
class QuotesService implements IQuotes {
  constructor(
    @inject('AlphaVantageService')
    private alphaVantageService: IAlphaVantageDTO,
  ) {}

  public async execute({ stock_name }: IRequest): Promise<IQuotesDTO> {
    const price = await this.alphaVantageService.getLatest({ stock_name });

    if (!price) {
      throw new AppError('stocks not found');
    }

    const date = new Date(price['07. latest trading day']);

    const quotes = {
      name: stock_name,
      lastPrice: parseFloat(price['05. price']),
      pricedAt: date.toISOString(),
    };

    return quotes;
  }
}

export default QuotesService;
