import React, {useState, useEffect} from "react";

import Routes from './routes'

import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import {
  serverAlive
} from "./api/AppRequests";

import './App.css';

const App = () => {
  const [alive, setAlive] = useState(false);

  useEffect(() => {
      let serverAliveReq = serverAlive();
      serverAliveReq.then(
        result => {
          setAlive(result)
        }
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
  );
}

export default App;
