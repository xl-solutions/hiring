import styles from "./styles.module.css"
export default function ResultFiltter({acao}) {
    return (
        <div className={styles.results}>
            <div className={styles.container_1_results}>
                <p className={styles.paragraph_result}>Preço na data de compra: {acao.priceAtDate}</p>
                <p className={styles.paragraph_result}>Preço mais recente: {acao.lastPrice}</p>
            </div>
            <p className={styles.paragraph_result}>Ganhos ou Perdas: {acao.capitalGains}</p>
        </div>
    )
}