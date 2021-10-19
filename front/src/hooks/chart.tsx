import React, { createContext, useContext, useState } from 'react';

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

export interface ISeries {
  name: string;
  data: any[];
  type?: string;
}

interface ChartContextData {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  series: ISeries[];
  setSeries: React.Dispatch<React.SetStateAction<ISeries[]>>;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

const ChartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([
    { name: 'IBM', data: [] },
  ] as ISeries[]);

  return (
    <ChartContext.Provider
      value={{
        series,
        setSeries,
        loading,
        setLoading,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

function useChart(): ChartContextData {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a ChartProvider');
  }

  return context;
}

export { ChartProvider, useChart };
