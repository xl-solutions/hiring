import { useState } from "react";
import Card from "../Card";
import styles from "./styles.module.css"

export default function GridCard({setAction, setShow, stocks}){
    const [newStock, setNewStock] = useState([...stocks])
    console.log(newStock)
    return(
        <div className={styles.grid}>
            {newStock.map(stock => (<Card key={stock.name}  stock={stock} setAction={setAction} setShow={setShow}  />))}
        </div>
    )
}