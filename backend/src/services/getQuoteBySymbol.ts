import { api } from './api';

interface IData {
  'Global Quote': GlobalQuote;
}

interface GlobalQuote {
  '01. symbol': string;
  '05. price': string;
  '07. latest trading day': string;
}

export async function getQuoteBySymbol(symbol: string) {
  const params = {
    function: 'GLOBAL_QUOTE',
    symbol,
  };

  try {
    const { data }: { data: IData } = await api.get('/', { params });

    return data['Global Quote'];
  } catch (error) {
    console.log(error);
  }
}
