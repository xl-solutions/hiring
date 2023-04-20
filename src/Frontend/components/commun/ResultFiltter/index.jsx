import styles from "./styles.module.css"
export default function ResultFiltter({ gains }) {
   
    return (
        <div className={styles.results} >
            <div className={styles.container_1_results}>
                <p className={styles.paragraph_result}>Preço na data de compra: {gains.purchasedPrice}</p>
                <p className={styles.paragraph_result}>Preço mais recente: {gains.lastPrice}</p>
            </div>
            <p className={styles.paragraph_result}>Ganhos ou Perdas: {gains.capitalGains}</p>
        </div>
    )
}