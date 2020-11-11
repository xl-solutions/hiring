import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../views/Home/Home';
import Portfolio from '../views/Portfolio/Portfolio';
import Onboarding from '../views/Onboarding/Onboarding';
import Menu from '../components/Shared/Menu/Menu';

export default function Routes() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" component={Onboarding} />
        <Route path="/home" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
      </Switch>
    </Router>
  );
}
