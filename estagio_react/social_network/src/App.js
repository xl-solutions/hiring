import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/* componentes gerais */
import About from "./components/About";
import Header from "./components/Header";
import UserList from "./components/UserList";

/* componentes módulo álbums */
import PhotoViewer from "./components/albums/PhotoViewer";
import UserAlbums from "./components/albums/UserAlbums";

/* componentes módulo posts */
import UserPosts from "./components/posts/UserPosts";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/album" exact>
          <UserList type="album" title="Álbuns" />
        </Route>
        <Route path="/posts" exact>
          <UserList type="posts" title="Posts" />
        </Route>
        <Route
          path="/album/:idUser/:idAlbum"
          render=
          {
            (props) => <PhotoViewer
              idUser={props.match.params.idUser}
              id={props.match.params.idAlbum} />
          } />
        <Route
          path="/album/:id"
          render=
          {
            (props) => <UserAlbums id={props.match.params.id} />
          } />
        <Route
          path="/posts/:id"
          render=
          {
            (props) => <UserPosts id={props.match.params.id} />
          } />
        <Route>
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
