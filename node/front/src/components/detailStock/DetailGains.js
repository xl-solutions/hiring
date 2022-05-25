import React from 'react';


export const DetailGains = (props) => {
    const {gains} = props;
    const capitalGains = (Math.round(gains.capitalGains * 100) / 100).toFixed(2);
    const date = new Date();
    const purchasedAt = new Date(gains.purchasedAt);
    const purchasedAtFormatted = purchasedAt.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const formattedTime = date.toLocaleTimeString('pt-BR');
    return (
      <div>
          <div className="card text-center">
            <div className="card-header">
                Restultado
            </div>
            <div className="card-body">
                <h5 className="card-title">{gains.name}</h5>
                <p className="card-text">Quantidade: {gains.purchasedAmount}</p>
                <p className="card-text">Data da compra: {purchasedAtFormatted}</p>
                <p className="card-text">Preço na data de compra: $ {gains.priceAtDate}</p>
                <p className="card-text">Preço mais recente: $ {gains.lastPrice}</p>
                <p className="card-text"><b>{gains.capitalGains > 0 ? <span className="text-success">Lucro obtido: $ {capitalGains}</span> : <span className="text-danger">Perda: $ {capitalGains}</span> }</b></p>
            </div>
            <div className="card-footer text-muted">
                Data da consulta: {formattedDate} - {formattedTime}
            </div>
          </div>
      </div>
    )
}
