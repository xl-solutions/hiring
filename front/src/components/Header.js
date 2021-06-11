/* eslint-disable react/prop-types */
import React, { Component } from 'react'

import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className='headerBackground'>
        <h1 className='headerTitle'>{this.props.title}</h1>
      </div>
    )
  }
}

export default Header
