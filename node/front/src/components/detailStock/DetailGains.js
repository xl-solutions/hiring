import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";


export const DetailGains = (props) => {
    const {gains} = props;
    const [date, setDate] = useState(null);
    useEffect(() => {
        let today = new Date();
        let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        setDate(date);
        }, []);
    return (
      <div>
          <div className="card text-center">
            <div className="card-header">
                Restultado
            </div>
            <div className="card-body">
                <h5 className="card-title">{gains.name}</h5>
                <p className="card-text">Quantidade: {gains.purchasedAmount}</p>
                <p className="card-text">Data da compra: {gains.purchasedAt}</p>
                <p className="card-text">Preço na data de compra: {gains.priceAtDate}</p>
                <p className="card-text">Preço mais recente: {gains.lastPrice}</p>
                <p className="card-text">Lucro obtido: {gains.capitalGains}</p>
                <Link to="/gains" className="btn btn-primary">Volver</Link>
            </div>
            <div className="card-footer text-muted">
                Data da consulta: {date}
            </div>
          </div>
      </div>
    )
}
