import { all } from 'redux-saga/effects';

import portfolio from './portfolio/sagas';

export default function* rootSaga(): any {
  return yield all([portfolio]);
}
