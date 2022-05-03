import { getHistoricalPriceBySymbol } from '../../../../services/getHistoricalPriceBySymbol';
import {
  getQuoteBySymbol,
  GlobalQuote,
} from '../../../../services/getQuoteBySymbol';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  stock_name: string;
  purchasedAmount: number;
  purchasedAt: string;
}

interface IReturn {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

export class GainsByPurchaseOnSpecificDateUseCase {
  async execute({ stock_name, purchasedAmount, purchasedAt }: IRequest) {
    if (!stock_name) {
      throw new AppError('Stock name not provided');
    }

    const searchQuote = (await getQuoteBySymbol(stock_name)) as GlobalQuote;
    const searchHistoricalPrice = await getHistoricalPriceBySymbol(stock_name);

    const lastPrice = Number(searchQuote['05. price']);
    const priceAtDate = Number(searchHistoricalPrice[purchasedAt]['4. close']);

    const capitalGains =
      lastPrice * purchasedAmount - purchasedAmount * priceAtDate;

    const earningsByPurchase: IReturn = {
      name: searchQuote['01. symbol'],
      purchasedAmount,
      purchasedAt,
      priceAtDate,
      lastPrice,
      capitalGains,
    };

    return earningsByPurchase;
  }
}
