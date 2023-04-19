import styles from "./styles.module.css"

export default function Card({acao}) {
    return (
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h4>{acao.name}</h4>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.price}>Preço R$ {acao.price} ({acao.percent}% de queda)</p>
                        <p className={styles.data}>Data/Hora atualizada: {acao.dateTime}</p>
                    </div>
                    <div className={styles.footer}>
                        <button>Ver Histórico</button>
                    </div>
                </div>
           
    )
}