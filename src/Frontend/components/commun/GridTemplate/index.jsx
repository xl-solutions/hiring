import { useState } from "react";
import Card from "../Card";
import styles from "./styles.module.css"

export default function GridCard({setAction, setShow, stocks}){
   console.log(stocks)
    return(
        <div className={styles.grid}>
            {stocks.map(stock => (<Card key={stock.name}  stock={stock} setAction={setAction} setShow={setShow}  />))}
        </div>
    )
}