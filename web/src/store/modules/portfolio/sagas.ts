import { all, takeLatest, select, put } from 'redux-saga/effects';
import { IState } from '../..';
import {
  addStockToPortfolioRequest,
  addStockToPortfolioFailure,
  addStockToPortfolioSuccess,
} from './actions';
import { ActionsTypes } from './types';

type CheckStockExistsRequest = ReturnType<typeof addStockToPortfolioRequest>;

function* checkStockExists({ payload }: CheckStockExistsRequest) {
  const { stock } = payload;

  const existsStock: string = yield select((state: IState) => {
    return state.portfolio.items.find((item) => item.stock.name === stock.name)
      ?.stock.name;
  });

  if (!existsStock) {
    yield put(addStockToPortfolioSuccess(stock));
  } else {
    yield put(addStockToPortfolioFailure(stock.name));
  }
}

export default all([
  takeLatest(ActionsTypes.addStockToPortfolioRequest, checkStockExists),
]);
