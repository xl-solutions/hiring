import { injectable, inject } from 'tsyringe';
import { IAlphaVantageDTO } from '@modules/alphavantage/entities/IAlphaVantageDTO';
import AppError from '@shared/errors/AppError';
import {
  IRequest,
  IResponse,
  IHistory,
} from '@modules/stocks/entities/IHistoryDTO';

@injectable()
class HistoryService implements IHistory {
  constructor(
    @inject('AlphaVantageService')
    private alphaVantageService: IAlphaVantageDTO,
  ) {}

  private async compareGreaterDate(to: string, from: string) {
    const date1 = new Date(to);
    const date2 = new Date(from);

    return date1 > date2;
  }

  private async compareGreaterDateWithCurrentDate(from: string) {
    const date = new Date(from);
    const currentDate = new Date();

    if (date > currentDate) {
      return currentDate.toISOString().split('T')[0];
    }

    return from;
  }

  public async execute({ stock_name, to, from }: IRequest): Promise<IResponse> {
    if (!this.compareGreaterDate(to, from)) {
      throw new AppError('to "date" is smaller or equal the "from" date');
    }

    const greater = await this.compareGreaterDateWithCurrentDate(from);
    const prices = await this.alphaVantageService.getPrices({ stock_name });
    const keys = Object.keys(prices).reverse();

    let pricesBettwenInterval = [];

    for (let i = 0; i < keys.length; i++) {
      // complex O(n)
      if (keys[i] >= greater && keys[i] <= to) {
        pricesBettwenInterval.push({
          opening: parseFloat(prices[keys[i]]['1. open']),
          low: parseFloat(prices[keys[i]]['3. low']),
          high: parseFloat(prices[keys[i]]['2. high']),
          closing: parseFloat(prices[keys[i]]['4. close']),
          pricedAt: keys[i],
        });
      }
    }

    return { name: stock_name, prices: pricesBettwenInterval };
  }
}

export default HistoryService;
