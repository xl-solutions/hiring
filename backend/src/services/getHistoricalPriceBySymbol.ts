import { api } from './api';

export interface IData {
  'Time Series (Daily)': { [key: string]: TimeSeriesDaily };
}

export interface TimeSeriesDaily {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}

export async function getHistoricalPriceBySymbol(symbol: string) {
  const params = {
    function: 'TIME_SERIES_DAILY',
    outputsize: 'full',
    symbol,
  };

  try {
    const { data }: { data: IData } = await api.get('/', { params });

    return data['Time Series (Daily)'];
  } catch (error) {
    console.log(error);
  }
}
