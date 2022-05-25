import React, { useContext } from 'react';
import { PortfolioContext } from '../../contexts/PortfolioContext';

export const DetailQuote = (props) => {
    const {portfolio, setPortfolio} = useContext(PortfolioContext);
    const {quote} = props;
    const date = new Date(quote.pricedAt);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const formattedTime = date.toLocaleTimeString('pt-BR');
    console.log(setPortfolio)
    const handleAddPortfolio = () => {
      storePortfolio(quote.name);
      console.log(quote.name)
    }
  
    const storePortfolio = (newPortfolio) => {
      const listPortfolio = [...portfolio, newPortfolio]; 
      localStorage.setItem("portfolio", JSON.stringify(listPortfolio)); 
      setPortfolio(listPortfolio); 
    }

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{quote.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formattedDate} - {formattedTime}</h6>
          <p className="card-text">Último Preço: <b>$ {quote.lastPrice}</b></p>
          <button onClick={handleAddPortfolio} className="btn btn-primary">Adicionar ao Portfolio</button> 
        </div>
      </div>
    </div>
  )
}
