import { searchStocksBySymbol } from '../../../../services/searchStocksBySymbol';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  symbol: string;
}

interface IResponse {
  name: string;
  company: string;
  region: string;
  currency: string;
}

export class SearchStocksUseCase {
  async execute({ symbol }: IRequest) {
    if (!symbol) {
      throw new AppError('Search parameter not provided');
    }

    const searchStocks = await searchStocksBySymbol(symbol);

    const stocks: IResponse[] = [];

    searchStocks.forEach((stock) => {
      stocks.push({
        name: stock['1. symbol'],
        company: stock['2. name'],
        region: stock['4. region'],
        currency: stock['8. currency'],
      });
    });

    return stocks;
  }
}
