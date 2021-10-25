import React, {useState, useEffect} from 'react'
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


const Routes = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // updateKeyValue().then(
    //   (res)=>{
    //     setCount(res.value)
    // })
  }, [])

  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/quote" component={Quote} />
          <Route path="/history" component={History} />
          <Route exact path="/search" component={Search} />
          <Redirect from='*' to='/search' />
        </Switch>
        <Footer 
          count={count}
        />
    </Router>
  )
}

export default Routes

