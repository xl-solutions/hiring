import React, { Component } from 'react';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { inventoryReducer, uploadReducer } from './redux/reducers'
import { sagas } from './redux/sagas'
import createSagaMiddleware from 'redux-saga'
import { InventoryList } from './components/InventoryList';
import { FiltersPanel } from './components/FiltersPanel';
import { UploadButton } from './components/UploadButton';

const saga = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    inventory:inventoryReducer,
    upload:uploadReducer
  }),
  composeEnhancers(
    applyMiddleware(saga)
  )
)

saga.run(sagas)

const styles = {
  header: {
      display: "flex",
      alignItems: "flex-end"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider> 
          <div className="App">

            <header className="App-header">  
            </header>

            <div style={styles.header}>
              <FiltersPanel/>
              <UploadButton/>
            </div>

            <InventoryList/>

          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
