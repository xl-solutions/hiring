import { Component } from "react"
import { NavLink } from "react-router-dom"

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav>
          <NavLink to="/" exact>Sobre</NavLink>
          <NavLink to="/album">Álbuns</NavLink>
          <NavLink to="/posts">Posts</NavLink>
        </nav>
      </div>
    )
  };
};