import { call, put, all, takeLatest } from 'redux-saga/effects';

import * as types from 'store/types';
import { get, history, compare, gains } from 'services/stocks';

import {
  RequestGainsAction,
  RequestQuoteAction,
  RequestHistoryAction,
  RequestCompareAction,
} from 'interfaces/actions/stocks';
import {
  requestQuoteSuccess,
  requestGainsSuccess,
  requestHistorySuccess,
  requestCompareSuccess,
} from 'store/actions/stocks';

function* getQuote(action: RequestQuoteAction): any {
  const { data, meta } = action;

  const onSuccess = meta?.onSuccess;
  const onFailure = meta?.onFailure;

  try {
    const response = yield call(get, data);
    if (onSuccess) yield call(onSuccess);
    yield put(requestQuoteSuccess(response.data));
  } catch (error) {
    if (onFailure) yield call(onFailure);
  }
}

function* getHistory(action: RequestHistoryAction): any {
  const { data, meta } = action;

  const onSuccess = meta?.onSuccess;
  const onFailure = meta?.onFailure;

  try {
    const response = yield call(history, data);
    if (onSuccess) yield call(onSuccess);
    yield put(requestHistorySuccess(response.data));
  } catch (error) {
    if (onFailure) yield call(onFailure);
  }
}

function* requestCompare(action: RequestCompareAction): any {
  const { data, meta } = action;

  const onSuccess = meta?.onSuccess;
  const onFailure = meta?.onFailure;

  try {
    const response = yield call(compare, data);
    if (onSuccess) yield call(onSuccess);
    yield put(requestCompareSuccess(response.data));
  } catch (error) {
    if (onFailure) yield call(onFailure);
  }
}

function* getGains(action: RequestGainsAction): any {
  const { data, meta } = action;

  const onSuccess = meta?.onSuccess;
  const onFailure = meta?.onFailure;

  try {
    const response = yield call(gains, data);
    if (onSuccess) yield call(onSuccess);
    yield put(requestGainsSuccess(response.data));
  } catch (error) {
    if (onFailure) yield call(onFailure);
  }
}

function* stocksRoot(): any {
  yield all([
    takeLatest(types.GET_QUOTE, getQuote),
    takeLatest(types.GET_HISTORY, getHistory),
    takeLatest(types.REQUEST_COMPARE_STOCKS, requestCompare),
    takeLatest(types.GET_GAINS, getGains),
  ]);
}

export default stocksRoot;
