import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={(): any => (
        <Redirect to={{ pathname: '/dashboard/IBM/quote' }} />
      )}
    />

    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
