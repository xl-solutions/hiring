import api from '../api/alphaVantage';
import ServerError from '../errors/ServerError';

interface Request {
  stock_name: string;
}

interface Response {
  name: string;
  lastPrice: number;
  priceAt: string;
}

class StockInfoService {
  public async execute({ stock_name }: Request): Promise<Response> {
    const { data } = await api.get('/query', {
      params: {
        symbol: stock_name,
        function: 'GLOBAL_QUOTE',
        apikey: process.env.ALPHA_VANTAGE_APIKEY,
      },
    });

    const {
      'Global Quote': { '01. symbol': name, '05. price': price },
    } = data;

    if (!name && !price) {
      throw new ServerError('Stock info not found');
    }

    return {
      name,
      lastPrice: Number(price),
      priceAt: new Date().toISOString(),
    };
  }
}

export default StockInfoService;
