import React, { Component } from 'react'
import logo from '../stocks.jpg'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <img src={logo} className='app-logo' alt='logo' />
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

export default Header
