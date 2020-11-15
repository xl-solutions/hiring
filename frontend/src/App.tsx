import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';

import { MenuProvider } from 'context/menu/MenuContext';

import Routes from 'routes';
import GlobalStyles from './styles';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <MenuProvider>
          <GlobalStyles />
          <Routes />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
