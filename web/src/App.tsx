import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
