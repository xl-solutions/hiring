import { all, SagaReturnType } from 'redux-saga/effects';

import stocksRoot from './stocks';

function* rootSaga(): Iterator<SagaReturnType<any>> {
  yield all([stocksRoot()]);
}

export default rootSaga;
