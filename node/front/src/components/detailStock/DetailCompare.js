import React from 'react';

export const DetailCompare = (props) => {
    const {compare} = props;
  return (
    <div className="row">
        {compare.map(stock => 
        <div className="col-sm-6" key={stock.name}>
            <div className="card">
            <div className="card-header">
                {stock.name}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Último Preço: <b>$ {stock.lastPrice}</b></li>
                <li className="list-group-item">Data: {new Date(stock.pricedAt).toLocaleDateString("pt-BR")}</li>
            </ul>
            </div>
        </div>
        )}
    </div>
  )
}
