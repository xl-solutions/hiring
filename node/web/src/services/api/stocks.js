import client from './index';
import qs from 'query-string';

export const getQuotation = (stockName) => {
  return client.get(`/stocks/${stockName}/quote`);
}

export const getHistory = (stockName, from, to) => {
  const query = qs.stringify({ from, to });

  return client.get(`/stocks/${stockName}/history?${query}`);
}

export const stocksCompare = (stockName, stocks) => {
  return client.post(`/stocks/${stockName}/compare`, { stocks });
}

export const gainsCalcule = (stockName, purchasedAmount, purchasedAt) => {
  const query = qs.stringify({ purchasedAmount, purchasedAt });

  return client.get(`/stocks/${stockName}/gains?${query}`);
}
