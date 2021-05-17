import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

// import './App.sass';
import { Header } from './components/Header';
import { UserList } from './pages/UserList';
import { AlbumList } from './pages/AlbumList';
import { AlbumDetails } from './pages/AlbumDetails';

const App = () => {
  return(
  <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <UserList></UserList>
        </Route>

        <Route exact path="/albums/:id" component={AlbumList}>
        </Route>

        <Route exact path="/albums/:user/:album" component={(props) => (<AlbumDetails {...props} />)}>
        </Route>

        <Redirect to="/" />
      </Switch>
  </Router>
  );
}

export default App;
