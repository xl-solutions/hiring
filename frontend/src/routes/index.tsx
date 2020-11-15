import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import QuotesPage from 'pages/Quotes';

import GainsPage from 'pages/Gains';
import ComparePage from 'pages/Compare';
import HistoryPage from 'pages/History';
import PortfolioPage from 'pages/Portfolio';

import Route from './default';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={QuotesPage} />
        <Route path="/historico" component={HistoryPage} />
        <Route path="/comparar" exact component={ComparePage} />
        <Route path="/projecoes" exact component={GainsPage} />
        <Route path="/portifolio" exact component={PortfolioPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
