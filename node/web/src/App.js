import React from 'react';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import { Header, Wrapper } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Wrapper>
        <Container>
          <Routes />
        </Container>
      </Wrapper>
    </div>
  );
}

export default App;
