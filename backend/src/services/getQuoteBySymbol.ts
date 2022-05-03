import { api } from './api';

interface IData {
  'Global Quote': GlobalQuote;
}

export interface GlobalQuote {
  '01. symbol': string;
  '05. price': string;
  '07. latest trading day': string;
}

export async function getQuoteBySymbol(
  symbol: string | string[],
): Promise<GlobalQuote | GlobalQuote[]> {
  const result = [];

  const params = {
    function: 'GLOBAL_QUOTE',
    symbol,
  };

  if (Array.isArray(symbol)) {
    for (const stock of symbol) {
      params.symbol = stock;

      try {
        const { data }: { data: IData } = await api.get('/', { params });

        result.push(data['Global Quote']);
      } catch (error) {
        console.log(error);
      }
    }

    return result;
  } else {
    try {
      const { data }: { data: IData } = await api.get('/', { params });

      return data['Global Quote'];
    } catch (error) {
      console.log(error);
    }
  }
}
