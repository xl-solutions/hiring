import React, { Component } from 'react';
import logo from '../logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1>{this.props.title}</h1>
        </div>
    );
  }
}

export default Header;
