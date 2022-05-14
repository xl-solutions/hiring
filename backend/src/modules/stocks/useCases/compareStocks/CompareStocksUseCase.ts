import {
  getQuoteBySymbol,
  GlobalQuote,
} from '../../../../services/getQuoteBySymbol';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  stock_name: string;
  stocks: string[];
}

interface IReturn {
  lastPrices: ILastPrice[];
}

interface ILastPrice {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export class CompareStocksUseCase {
  async execute({ stock_name, stocks }: IRequest) {
    const lastPrices: ILastPrice[] = [];

    if (!stock_name || !stocks.length) {
      throw new AppError('Stock name or stocks for compare not provided');
    }

    stocks.unshift(stock_name);
    const searchQuotes = (await getQuoteBySymbol(stocks)) as GlobalQuote[];

    searchQuotes.forEach((stock) => {
      if (!stock['01. symbol']) {
        throw new AppError('Requests limit exceeded free API');
      } else {
        lastPrices.push({
          name: stock['01. symbol'],
          lastPrice: Number(stock['05. price']),
          pricedAt: stock['07. latest trading day'],
        });
      }
    });

    const compareStocks: IReturn = {
      lastPrices,
    };

    return compareStocks;
  }
}
