import api from './api';

export interface IGetHistoryResponse {
  name: string;
  lastPrice: number;
  pricedAt: Date | string;
}

export interface IStockPriceHistory {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

export interface IStockGains {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  pricePurchased: number;
  priceNow: number;
  gains: number;
}

export const getStock = async (symbol: string) => {
  const { data } = await api.get(`${symbol}/quote`);
  return data;
}

export const getCompare = async (symbolPrimary: string, stocks: Array<string>) => {
  console.log("ho",stocks);
  const { data } = await api.get(`${symbolPrimary}/${stocks}/compare`);

  return data;
}


export const getProjection = async (symbolPrimary: string, dateFrom: string, purchasedAmount: Number) => {
  const { data } = await api.get(`${symbolPrimary}/gains?purchasedAt=${dateFrom}&purchasedAmount=${purchasedAmount}`);
  return data;
}
