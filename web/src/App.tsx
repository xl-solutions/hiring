import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import GlobalStyle from './styles/global';
import { persistor, store } from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </Router>
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
