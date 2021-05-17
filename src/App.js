import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import './App.sass';
import { Header } from './components/Header';
import { UserList } from './pages/UserList';
import { AlbumList } from './pages/AlbumList';
import { AlbumDetails } from './pages/AlbumDetails';
import { PostList } from './pages/PostList';
import { PostDetails } from './pages/PostDetails';

const App = () => {
  return(
  <Router>
      <div className="container">
        <Header user={{ name: 'Pedro Vicari', role: 'Teste de Front-end' }}></Header>
        <Switch>
          <Route exact path="/">
            <UserList></UserList>
          </Route>

          <Route exact path="/albums/:id" component={AlbumList}>
          </Route>

          <Route exact path="/albums/:user/:album" component={(props) => (<AlbumDetails {...props} />)}>
          </Route>

          <Route exact path="/posts/:id" component={PostList}>
          </Route>

          <Route exact path="/posts/:user/:post" component={(props) => (<PostDetails {...props} />)}>
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
  </Router>
  );
}

export default App;
