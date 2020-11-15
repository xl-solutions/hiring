import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import rootSaga from './sagas';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddlware = createSagaMiddleware();

const store: Store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddlware)
);

sagaMiddlware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
