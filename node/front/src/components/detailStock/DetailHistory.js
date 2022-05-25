import React from 'react'

export const DetailHistory = (props) => {
    const {history} = props;
    return (
      <div>
          <h2>{history.name}</h2>
          <table className="table table-striped table-hover mb-4">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Abertura</th>
                <th scope="col">Mínimo</th>
                <th scope="col">Máximo</th>
                <th scope="col">Fechamento</th>
                <th scope="col">Data</th>
                </tr>
            </thead>
            <tbody>
            {history.pricing.map((price, index) =>                 
                <tr key={price.pricedAt}>
                <th scope="row">{index + 1}</th>
                <td>$ {price.opening}</td>
                <td>$ {price.low}</td>
                <td>$ {price.high}</td>
                <td>$ {price.closing}</td>
                <td>{new Date(price.pricedAt).toLocaleDateString("pt-BR")}</td>
                </tr>
            )}
            </tbody>
          </table>
      </div>
    )
}
