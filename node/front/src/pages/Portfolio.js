import React, { useState, useContext } from 'react'
import { PortfolioContext } from '../contexts/PortfolioContext'
import { Success } from '../components/alerts/Success';

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
              {success ? <span><Success /></span> : <span></span> }
              <ul className="list-group col-md-4 offset-md-4">
                {portfolio.map((stock, index) => <li className="list-group-item" key={index}>{stock} - <button data-id={index} onClick={handleDeletePortfolio} className="btn btn-danger">Apagar</button></li>)}
              </ul>
            </div>
        </div>
    </section>
  )
}
