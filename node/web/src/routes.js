import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Portfolio from './pages/portfolio'
import History from './pages/history'
import Compare from './pages/compare'
import Gains from './pages/gains'

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Portfolio} />
      <Route path='/history' component={History} />
      <Route path='/compare' component={Compare} />
      <Route path='/gains' component={Gains} />
      <Route render={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
}
