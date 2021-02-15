import React from 'react';
import Button from '@material-ui/core/Button';






export default function Wallet(props){



  function addWalletStocks() {
    const elements = [];

    for (let i = 0; i <= 2; i++) {
      const el = (
        <div className="dataStockWallet">
        <div >{props.name}</div>
        <div >{props.lastPrice}</div>
        <div >{props.pricedAT}</div>
        <div className="divbt">
          <Button className="bt-search" variant="contained" color="secondary">-</Button>
        </div>
      </div> 
      );
      elements.push(el)
    }
    return elements;
  }


    return(
        <div className="wallet">
          <h1> Wallet </h1>
          <div>
            {addWalletStocks()}
          </div>
        </div>
    )


};