import { useState } from "react"
import ResultFiltter from "../ResultFiltter"
import styles from "./styles.module.css"
import axios from 'axios';
import { getGains } from "@/Frontend/api/api";

export default function FilterBox() {
    const [stock_name, setStockName] = useState("");
    const [purchasedAmount, setPurchasedAmount] = useState(0);
    const [purchasedAt, setPurchasedAt] = useState("");
    const [gains, setGains] = useState({});
    
    const handleStockNameChange = (event) => {
        setStockName(event.target.value);
    };

    const handlePurchasedAmountChange = (event) => {
        setPurchasedAmount(event.target.value);
    };

    const handlePurchasedAtChange = (event) => {
        setPurchasedAt(event.target.value);
    };
    const handleCalculateClick = async () => {
        try {
            const response = await getGains(stock_name,purchasedAmount, purchasedAt);
            const body = response;
            setGains(body)
          } catch (error) {
            throw error
          }
    };
    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <label htmlFor="nome-da-acao" className={styles.label}>Nome da Ação:</label>
                <input type="string" id="quantia-cotas" name="nome-da-acao" className={styles.input} value={stock_name} onChange={handleStockNameChange} />
                <label htmlFor="quantia-cotas" className={styles.label}>Quantia de cotas:</label>
                <input type="number" id="quantia-cotas" name="quantia-cotas" className={styles.input} value={purchasedAmount} onChange={handlePurchasedAmountChange} />
                <label htmlFor="data-compra" className={styles.label}>Data de compra:</label>
                <input type="date" id="data-compra" name="data-compra" className={styles.input} value={purchasedAt} onChange={handlePurchasedAtChange} />

                <button onClick={handleCalculateClick}>Calcular</button>
            </div>
            <ResultFiltter gains={gains}  />
        </div>
    )
}