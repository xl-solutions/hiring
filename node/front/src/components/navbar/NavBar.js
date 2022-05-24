import React from 'react'
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="#">Corretora de Investimentos</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/quote">Preço Atual</Link>
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
        </div>
    </nav>
  )
}