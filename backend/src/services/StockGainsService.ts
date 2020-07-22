import api from '../api/alphaVantage';
import StockInfoService from './StockInfoService';
import ServerError from '../errors/ServerError';

interface Request {
  stock_name: string;
  purchasedAmount: number;
  purchasedAt: string;
}

interface Response {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

class StockGainsService {
  public async execute({
    stock_name,
    purchasedAmount,
    purchasedAt,
  }: Request): Promise<Response> {
    const { data } = await api.get('/query', {
      params: {
        symbol: stock_name,
        function: 'TIME_SERIES_DAILY',
        outputsize: 'full',
        apikey: process.env.ALPHA_VANTAGE_APIKEY,
      },
    });

    const { 'Time Series (Daily)': stockDates } = data;

    const stockAtDate = stockDates[purchasedAt];

    if (!stockAtDate) {
      throw new ServerError(
        'Stock information was not found at specific date parameter',
      );
    }

    const { '4. close': closing } = stockAtDate;

    const priceAtDate = Number(closing);

    const totalAtDate = purchasedAmount * priceAtDate;

    const stockInfoService = new StockInfoService();
    const { lastPrice } = await stockInfoService.execute({ stock_name });

    const totalAtMoment = purchasedAmount * lastPrice;

    const capitalGains = totalAtMoment - totalAtDate;

    return {
      name: stock_name,
      purchasedAmount,
      purchasedAt,
      priceAtDate,
      lastPrice,
      capitalGains,
    };
  }
}

export default StockGainsService;
