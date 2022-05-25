import React, { useState, useContext } from 'react'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { Success } from '../components/alerts/Success';
import { Link } from "react-router-dom";

export const Portfolio = () => {
  const {portfolio, setPortfolio} = useContext(PortfolioContext);
  const [success, setSuccess] = useState("");

  const handleDeletePortfolio = (event) => {
    const id = event.target.getAttribute("data-id");
    removePortfolio(id);
  }

  const removePortfolio = (id) => {
    const portfolioToRemove = portfolio[id]; 
    const newListPortfolio = portfolio.filter((store, index) => index != id); 
    localStorage.setItem("portfolio", JSON.stringify(newListPortfolio)); 
    setPortfolio(newListPortfolio);
    setSuccess(true);
  }

  return (
    <section>
        <h1>Meu Portfolio</h1>
        <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {success ? <span><Success /></span> : <span></span> }
                <ul className="list-group">
                  {portfolio.map((stock, index) => <li className="list-group-item" key={index}>{stock} | <button data-id={index} onClick={handleDeletePortfolio} className="btn btn-sm btn-outline-danger">Apagar</button></li>)}
                </ul>
                <span className="text-info">Você pode adicionar mais ações ao Portfólio depois de escolher uma <Link className="text-primary" to="/quote">cotação aqui.</Link></span>
              </div>
            </div>
        </div>
    </section>
  )
}
