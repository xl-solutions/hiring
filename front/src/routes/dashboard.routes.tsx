import React from 'react';
import { Route } from 'react-router-dom';
import Compare from '../pages/Compare';
import Gains from '../pages/Gains';
import History from '../pages/History';
import Quote from '../pages/Quote';

const Routes: React.FC = () => (
  <>
    <Route path="/dashboard/:stockName/history" component={History} />
    <Route path="/dashboard/:stockName/compare" component={Compare} />
    <Route path="/dashboard/:stockName/quote" component={Quote} />
    <Route path="/dashboard/:stockName/gains" component={Gains} />
  </>
);

export default Routes;
