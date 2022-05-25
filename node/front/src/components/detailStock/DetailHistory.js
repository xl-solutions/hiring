import React from 'react'

export const DetailHistory = (props) => {
    const {history} = props;
    return (
      <div>
          <h2>{history.name}</h2>
          <ul className="list-group">
              {history.pricing.map(price => <li key={price.pricedAt} className="list-group-item">{ price.opening }</li>)}
          </ul>
      </div>
    )
}
