import {
  CompareData,
  ProjectionData,
  QuoteData,
  QuoteHistoryData,
} from 'interfaces';
import { Reducer } from 'react';

import * as types from 'store/types';

interface StocksAction {
  type: string;
  data: QuoteData | QuoteHistoryData | CompareData | ProjectionData;
}

interface StocksState {
  quoteData: QuoteData;
  quoteHistoryData: QuoteHistoryData;
  compareData: CompareData;
  projectionData: ProjectionData;
  portfolio: QuoteData[];
}

const INITIAL_STATE: StocksState = {
  quoteData: {} as QuoteData,
  quoteHistoryData: {} as QuoteHistoryData,
  compareData: {} as CompareData,
  projectionData: {} as ProjectionData,
  portfolio: [],
};

const stocks: Reducer<StocksState, StocksAction> = (
  state = INITIAL_STATE,
  action
): StocksState => {
  const { data, type } = action;

  switch (type) {
    case types.GET_QUOTE_SUCCESS:
      return { ...state, quoteData: data as QuoteData };
    case types.GET_HISTORY_SUCCESS:
      return {
        ...state,
        quoteHistoryData: data as QuoteHistoryData,
      };
    case types.REQUEST_COMPARE_STOCKS_SUCCESS:
      return {
        ...state,
        compareData: data as CompareData,
      };
    case types.GET_GAINS_SUCCESS:
      return {
        ...state,
        projectionData: data as ProjectionData,
      };
    case types.ADD_PORTFOLIO:
      // eslint-disable-next-line no-case-declarations
      const oldState = state.portfolio ? state.portfolio : [];
      return {
        ...state,
        portfolio: [...oldState, data as QuoteData],
      };
    case types.CLEAR_COMPARE:
      return {
        ...state,
        compareData: {} as CompareData,
      };
    case types.REMOVE_PORTFOLIO:
      // eslint-disable-next-line no-case-declarations
      const quoteDataToRemove = data as QuoteData;
      return {
        ...state,
        portfolio: [
          ...state.portfolio.filter(
            (item) => item.name !== quoteDataToRemove.name
          ),
        ],
      };
    default:
      return state;
  }
};

export default stocks;
