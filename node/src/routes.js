import React from 'react'
import { 
  BrowserRouter as Router,
  Redirect, 
  Route,
  Switch 
} from 'react-router-dom'

import Header from './common/template/header'
import Footer from './common/template/footer'

import Search from './pages/Search'
import Quote from './pages/Quote'
import History from './pages/History'
import Compare from './pages/Compare'
import Project from './pages/Project'


const Routes = () => {

  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/quote" component={Quote} />
          <Route path="/history" component={History} />
          <Route path="/compare" component={Compare} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/project" component={Project} />
          <Redirect from='*' to='/search' />
        </Switch>
        <Footer />
    </Router>
  )
}

export default Routes

