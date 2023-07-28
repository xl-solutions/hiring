import { useState } from "react"
import styles from "./styles.module.css"

export default function Card({stock, setAction, setShow}) {
    const tradeInfos = () => {
        setAction(stock.name)
        setShow(true)
    }
    const [newStock, setNewStock] = useState(stock)
    console.log(newStock)
    return (
        
        <div className={styles.card}>
            <div className={styles.header}>
                <h4>{newStock.name}</h4>
            </div>
            <div className={styles.body}>
                <p className={styles.price}>Preço {newStock.price}</p>
                <p className={styles.data}>Data/Hora atualizada: {newStock.date}</p>
            </div>
            <div className={styles.footer}>
                <button onClick={() => tradeInfos()}>Ver Histórico</button>
            </div>
            
        </div>
    )
    
}