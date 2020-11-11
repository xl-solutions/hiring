import React from 'react';
import GlobalStyle from './assets/styles/globalStyles';
import Routes from './routes/routes';
import { GlobalStorage } from './context/GlobalContext';

function App() {
  return (
    <React.Fragment>
      <GlobalStorage>
        <GlobalStyle />
        <Routes />
      </GlobalStorage>
    </React.Fragment>
  );
}

export default App;
