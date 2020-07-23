import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import GlobalStyle from './styles/global';

import 'react-datepicker/dist/react-datepicker.css';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </>
  );
};

export default App;
