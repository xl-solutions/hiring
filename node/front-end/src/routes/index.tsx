import React from 'react';
import { Switch } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Route from './Route';

import Stock from '../pages/Stock';
import Historico from '../pages/Historico';
import Comparacao from '../pages/Comparacao';
import Projecao from '../pages/Projecao';


import configureStore from '../store/configStore';

const { store, persistor } = configureStore();

const Routes: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Switch>
        <Route path="/stock" component={Stock} />
        <Route path="/comparacao" component={Comparacao} />
        <Route path="/historico" component={Historico} />
        <Route path="/projecao" component={Projecao} />
      </Switch>
    </PersistGate>
  </Provider>
);

export default Routes;
