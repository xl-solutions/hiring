import api from '../api/alphaVantage';
import { parseISO, eachDayOfInterval, format } from 'date-fns';

interface Request {
  stock_name: string;
  from: string;
  to: string;
}

interface Price {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

interface Response {
  name: string;
  prices: Price[];
}

class StockHistoryService {
  public async execute({ stock_name, from, to }: Request): Promise<Response> {
    const { data } = await api.get('/query', {
      params: {
        symbol: stock_name,
        function: 'TIME_SERIES_DAILY',
        outputsize: 'full',
        apikey: process.env.ALPHA_VANTAGE_APIKEY,
      },
    });

    const { 'Time Series (Daily)': stockDates } = data;

    const prices: Price[] = [];

    const dateFrom = parseISO(from);
    const dateTo = parseISO(to);

    const dateIntervals = eachDayOfInterval({ start: dateFrom, end: dateTo });

    dateIntervals.forEach(interval => {
      const intervalKey = format(interval, 'yyyy-MM-dd');

      const stock = stockDates[intervalKey];

      if (stock) {
        const {
          '1. open': opening,
          '2. high': high,
          '3. low': low,
          '4. close': closing,
        } = stock;

        prices.push({
          opening: Number(opening),
          low: Number(low),
          high: Number(high),
          closing: Number(closing),
          pricedAt: intervalKey,
        });
      }
    });

    return {
      name: stock_name,
      prices,
    };
  }
}

export default StockHistoryService;
