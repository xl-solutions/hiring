import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './redux/reducers'
import { sagas } from './redux/sagas'
import createSagaMiddleware from 'redux-saga'
import { InventoryList } from './components/InventoryList';

const saga = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(saga)
  )
)

saga.run(sagas)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">

          <header className="App-header">  
          </header>

          <InventoryList/>

        </div>
      </Provider>
    );
  }
}

export default App;
