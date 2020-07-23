import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Projection from '../pages/Projection';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />

      <Route path="/history/:stock_name" component={History} />
      <Route path="/projection/:stock_name" component={Projection} />
    </Switch>
  );
};

export default Routes;
