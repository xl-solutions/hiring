import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { PortfolioContext } from '../../contexts/PortfolioContext'


export const NavBar = () => {
    const {portfolio, setPortfolio} = useContext(PortfolioContext);
    console.log(portfolio);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand text-primary" to="#">AppInvestimentos</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/quote">Cotações</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/history">Histórico</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/compare">Comparação</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/gains">Lucros</Link>
                </li>
            </ul>
            </div>

            <span className="navbar-text">
                <Link className="nav-link text-default" to="/portfolio">+ Meu Portfolio <span className="badge bg-secondary rounded-pill">{portfolio.length}</span></Link>
            </span>
        </div>
    </nav>
  )
}