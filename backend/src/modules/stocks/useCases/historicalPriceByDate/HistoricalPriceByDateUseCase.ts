import { parse } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { getHistoricalPriceBySymbol } from '../../../../services/getHistoricalPriceBySymbol';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  stock_name: string;
  from: string;
  to: string;
}

interface IPrice {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

interface IReturn {
  name: string;
  prices: IPrice[];
}

@injectable()
export class HistoricalPriceByDateUseCase {
  constructor(
    @inject('DateFnsProvider')
    private dateFnsProvider: IDateProvider,
  ) {}
  async execute({ stock_name, from, to }: IRequest) {
    const searchHistoricalPrice = await getHistoricalPriceBySymbol(stock_name);

    if (!searchHistoricalPrice) {
      throw new AppError('Requests limit exceeded free API');
    }

    const dates = this.dateFnsProvider.getDatesInRange(
      parse(from, 'yyyy-MM-dd', new Date()),
      parse(to, 'yyyy-MM-dd', new Date()),
    );

    const prices: IPrice[] = [];

    dates.forEach((date) => {
      if (searchHistoricalPrice[date]) {
        prices.push({
          opening: Number(searchHistoricalPrice[date]['1. open']),
          low: Number(searchHistoricalPrice[date]['3. low']),
          high: Number(searchHistoricalPrice[date]['2. high']),
          closing: Number(searchHistoricalPrice[date]['4. close']),
          pricedAt: date,
        });
      }
    });

    const historicalPrice: IReturn = {
      name: stock_name,
      prices,
    };

    return historicalPrice;
  }
}
