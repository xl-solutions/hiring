import React from 'react'

export const DetailQuote = (props) => {
    const {quote} = props;
    const date = new Date(quote.pricedAt);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const formattedTime = date.toLocaleTimeString('pt-BR');
  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{quote.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{formattedDate} - {formattedTime}</h6>
          <p className="card-text">Último Preço: <b>$ {quote.lastPrice}</b></p>
        </div>
      </div>
    </div>
  )
}
