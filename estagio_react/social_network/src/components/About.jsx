import { Component } from "react"
import logo from '../logo.svg';
import '../App.css';

export default class About extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Este aplicativo foi desenvolvido por Luciano Amado como parte de um teste para Vaga de Desenvolvedor React.
          </p>
        </header>
      </div>
    )
  };
};