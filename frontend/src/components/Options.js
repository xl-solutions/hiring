import React, { Component } from 'react';
import './Options.css';

class Options extends Component {
  render() {
    return (
        <div className="app-options">
            { this.props.children }
        </div>
    );
  }
}

export default Options;
