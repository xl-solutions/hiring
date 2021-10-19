import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import dateToIso from '../utils/dateToIso';

interface IRequestHistory {
  stockNameParam: string;
  to: Date;
  from: Date;
}

interface IRequestQuote {
  stockNameParam: string;
}

interface IRequestCompare {
  stockNameParam: string;
  stocks: string[];
}

interface IRequestGains {
  stockNameParam: string;
  purchasedAmount: number;
  purchasedAt: Date;
}

export interface IPrice {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

export interface IResponseHistory {
  name: string;
  prices: IPrice[];
}

export interface IResponseQuote {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export interface IResponseCompare {
  lastPrices: IResponseQuote[];
}

export interface IResponseGains {
  name: string;
  purchasedAmount: string;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

interface StocksContextData {
  getHistory({
    stockNameParam,
    to,
    from,
  }: IRequestHistory): Promise<IResponseHistory>;
  getQuote({ stockNameParam }: IRequestQuote): Promise<IResponseQuote>;
  getCompare({
    stockNameParam,
    stocks,
  }: IRequestCompare): Promise<IResponseCompare>;
  stockName: string;
  setStockName: React.Dispatch<React.SetStateAction<string>>;
  getGains({
    stockNameParam,
    purchasedAmount,
    purchasedAt,
  }: IRequestGains): Promise<IResponseGains>;
}

const StocksContext = createContext<StocksContextData>({} as StocksContextData);

const StocksProvider: React.FC = ({ children }) => {
  const [stockName, setStockName] = useState('IBM');

  const getHistory = useCallback(
    async ({
      stockNameParam,
      to,
      from,
    }: IRequestHistory): Promise<IResponseHistory> => {
      const response: { data: IResponseHistory } = await api.get(
        `stocks/${stockNameParam}/history`,
        {
          params: {
            to: dateToIso(to),
            from: dateToIso(from),
          },
        },
      );
      return (response && response.data) || null;
    },
    [],
  );

  const getQuote = useCallback(
    async ({ stockNameParam }: IRequestQuote): Promise<IResponseQuote> => {
      const response: { data: IResponseQuote } = await api.get(
        `stocks/${stockNameParam}/quotes`,
      );

      return (response && response.data) || null;
    },
    [],
  );

  const getCompare = useCallback(
    async ({
      stockNameParam,
      stocks = [],
    }: IRequestCompare): Promise<IResponseCompare> => {
      const response: { data: IResponseCompare } = await api.post(
        `stocks/${stockNameParam}/compare`,
        { stocks },
      );

      return (response && response.data) || null;
    },
    [],
  );

  const getGains = useCallback(
    async ({
      stockNameParam,
      purchasedAmount,
      purchasedAt,
    }: IRequestGains): Promise<IResponseGains> => {
      const response: { data: IResponseGains } = await api.get(
        `stocks/${stockNameParam}/gains`,
        {
          params: {
            purchasedAmount,
            purchasedAt: dateToIso(purchasedAt),
          },
        },
      );

      return (response && response.data) || null;
    },
    [],
  );

  return (
    <StocksContext.Provider
      value={{
        getHistory,
        getQuote,
        getGains,
        getCompare,
        stockName,
        setStockName,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

function useStocks(): StocksContextData {
  const context = useContext(StocksContext);

  if (!context) {
    throw new Error('useStocks must be used within a StocksProvider');
  }

  return context;
}

export { StocksProvider, useStocks };
