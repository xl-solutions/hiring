import { Component } from "react"
import { NavLink } from "react-router-dom"

export default class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <nav>
          <NavLink className="header-button" to="/" exact>Sobre</NavLink>
          <NavLink className="header-button" to="/album">Álbuns</NavLink>
          <NavLink className="header-button" to="/posts">Posts</NavLink>
        </nav>
      </div>
    )
  };
};