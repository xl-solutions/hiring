import {
  MetaData,
  QuoteData,
  CompareData,
  ProjectionData,
  QuoteHistoryData,
} from 'interfaces';
import {
  RequestQuoteAction,
  RequestGainsAction,
  RequestGainsParams,
  RequestCompareParams,
  RequestCompareAction,
  RequestHistoryAction,
  RequestHistoryParams,
  RequestGainsActionSuccess,
  RequestQuoteActionSuccess,
  RequestHistoryActionSuccess,
  RequestCompareActionSuccess,
  AddPortfolioAction,
  ClearCompareAction,
  RemovePortfolioAction,
} from 'interfaces/actions/stocks';

import * as types from 'store/types';

const requestQuote = (data: string, meta?: MetaData): RequestQuoteAction => ({
  data,
  type: types.GET_QUOTE,
  meta,
});

const requestQuoteSuccess = (data: QuoteData): RequestQuoteActionSuccess => ({
  data,
  type: types.GET_QUOTE_SUCCESS,
});

const requestHistory = (
  data: RequestHistoryParams,
  meta?: MetaData
): RequestHistoryAction => ({
  data,
  type: types.GET_HISTORY,
  meta,
});

const requestHistorySuccess = (
  data: QuoteHistoryData
): RequestHistoryActionSuccess => ({
  data,
  type: types.GET_HISTORY_SUCCESS,
});

const requestCompare = (
  data: RequestCompareParams,
  meta?: MetaData
): RequestCompareAction => ({
  data,
  type: types.REQUEST_COMPARE_STOCKS,
  meta,
});

const requestCompareSuccess = (
  data: CompareData
): RequestCompareActionSuccess => ({
  data,
  type: types.REQUEST_COMPARE_STOCKS_SUCCESS,
});

const requestGains = (
  data: RequestGainsParams,
  meta?: MetaData
): RequestGainsAction => ({
  data,
  type: types.GET_GAINS,
  meta,
});

const requestGainsSuccess = (
  data: ProjectionData
): RequestGainsActionSuccess => ({
  data,
  type: types.GET_GAINS_SUCCESS,
});

const addPortfolio = (data: QuoteData): AddPortfolioAction => ({
  data,
  type: types.ADD_PORTFOLIO,
});

const clearCompare = (): ClearCompareAction => ({
  type: types.CLEAR_COMPARE,
});

const removePortifolio = (data: QuoteData): RemovePortfolioAction => ({
  data,
  type: types.REMOVE_PORTFOLIO,
});

export {
  clearCompare,
  addPortfolio,
  requestQuote,
  requestGains,
  requestCompare,
  requestHistory,
  removePortifolio,
  requestGainsSuccess,
  requestQuoteSuccess,
  requestHistorySuccess,
  requestCompareSuccess,
};
