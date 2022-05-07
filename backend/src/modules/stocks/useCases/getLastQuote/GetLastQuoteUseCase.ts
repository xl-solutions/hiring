import {
  getQuoteBySymbol,
  GlobalQuote,
} from '../../../../services/getQuoteBySymbol';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  stock_name: string;
}

interface IReturn {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export class GetLastQuoteUseCase {
  async execute({ stock_name }: IRequest) {
    if (!stock_name) {
      throw new AppError('Stock name not provided');
    }

    const searchQuote = (await getQuoteBySymbol(stock_name)) as GlobalQuote;

    if (!searchQuote) {
      throw new AppError('Requests limit exceeded free API');
    }

    const quoteFromStock: IReturn = {
      name: searchQuote['01. symbol'],
      lastPrice: Number(searchQuote['05. price']),
      pricedAt: searchQuote['07. latest trading day'],
    };

    return quoteFromStock;
  }
}
