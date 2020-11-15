import { useSelector } from 'react-redux';

import {
  QuoteData,
  CompareData,
  ProjectionData,
  QuoteHistoryData,
} from 'interfaces';

interface StocksState {
  stocks: {
    quoteData: QuoteData;
    portfolio: QuoteData[];
    compareData: CompareData;
    projectionData: ProjectionData;
    quoteHistoryData: QuoteHistoryData;
  };
}

const useQuoteData = () =>
  useSelector((state: StocksState) => state.stocks.quoteData);

const usePortfolio = () =>
  useSelector((state: StocksState) => state.stocks.portfolio);

const useCompareData = () =>
  useSelector((state: StocksState) => state.stocks.compareData);

const useProjection = () =>
  useSelector((state: StocksState) => state.stocks.projectionData);

const useHistoryData = () =>
  useSelector((state: StocksState) => state.stocks.quoteHistoryData);

export {
  useQuoteData,
  usePortfolio,
  useProjection,
  useCompareData,
  useHistoryData,
};
