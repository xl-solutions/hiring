import { Component } from "react"
import logo from '../logo.svg';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Este aplicativo foi desenvolvido por Luciano Amado como parte de um teste para Vaga de Desenvolvedor React.
          </p>
        </header>
      </div>
    )
  };
};