import React from 'react'

export const DetailQuote = (props) => {
    const {quote} = props;
  return (
    <div>
        <span>{quote.name}</span>
        <span>{quote.lastPrice}</span>
        <span>{quote.pricedAt}</span>
    </div>
  )
}
