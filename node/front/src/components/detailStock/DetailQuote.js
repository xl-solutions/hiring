import React, { useState, useContext } from 'react';
import { PortfolioContext } from '../../contexts/PortfolioContext';
import { Success } from '../alerts/Success';
import { Link } from "react-router-dom";

export const DetailQuote = (props) => {
    const {portfolio, setPortfolio} = useContext(PortfolioContext);
    const {quote} = props;
    const [success, setSuccess] = useState("");
    const date = new Date(quote.pricedAt);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const formattedTime = date.toLocaleTimeString('pt-BR');
    const handleAddPortfolio = () => {
      storePortfolio(quote.name);
    }
  
    const storePortfolio = (newPortfolio) => {
      const listPortfolio = [...portfolio, newPortfolio]; 
      localStorage.setItem("portfolio", JSON.stringify(listPortfolio)); 
      setPortfolio(listPortfolio); 
      setSuccess(true);
    }

  return (
    <div>
      {success ? <span><Success /></span> : <span></span> }
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{quote.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formattedDate} - {formattedTime}</h6>
          <p className="card-text">Último Preço: <b>$ {quote.lastPrice}</b></p>
          <button onClick={handleAddPortfolio} className="btn btn-outline-primary">Adicionar ao Portfolio</button> 
          <Link className="btn btn-outline-secundary" to="/portfolio">+ Meu Portfolio</Link> 
        </div>
      </div>
    </div>
  )
}
