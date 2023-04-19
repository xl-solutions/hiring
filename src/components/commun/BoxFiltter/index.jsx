import ResultFiltter from "../ResultFiltter"
import styles from "./styles.module.css"
let acao = { name: "USIM5.SA", purchasedAmount: 100, purchasedAt: "2016-05-31", priceAtDate: 3.97, lastPrice: 4.33, capitalGains: 36.0 }

export default function FilterBox() {
    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <label for="nome-acao" className={styles.label}>Nome da ação:</label>
                <input type="text" id="nome-acao" name="nome-acao" className={styles.input} />

                <label for="quantia-cotas" className={styles.label}>Quantia de cotas:</label>
                <input type="number" id="quantia-cotas" name="quantia-cotas" className={styles.input} />

                <label for="data-compra" className={styles.label}>Data de compra:</label>
                <input type="date" id="data-compra" name="data-compra" className={styles.input} />
            </div>
            <ResultFiltter acao={acao}/>
        </div>
    )
}