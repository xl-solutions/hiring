import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Portfolio from './pages/portfolio'

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Portfolio} />
      <Route path='/history' render={() => <h1>Preço Histórico</h1>} />
      <Route path='/compare' render={() => <h1>Comparar ações</h1>} />
      <Route path='/gains' render={() => <h1>Calcular ganhos e perdas</h1>} />
      <Route render={() => <h1>Página não encontrada</h1>} />
    </Switch>
  )
}
