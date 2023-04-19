import styles from "./styles.module.css"
export default function ModalDetail({ show, setShow, nameAction }) {

    return (
        <>
            {show && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                    <h2>Informações de Preços da {nameAction}</h2>
                        <div className={styles.container_data}>
                            <label htmlFor="data-inicio">Data de Início:</label>
                            <input type="date" id="data-inicio" name="data-inicio" />
                            <label htmlFor="data-fim">Data de Fim:</label>
                            <input type="date" id="data-fim" name="data-fim" />
                        </div>
                        <div className={styles.text} >
                            <p>Maior Preço: R$ 34</p>
                            <p>Menor Preço: R$ 234</p>
                            <p>Preço Médio: R$ 24234</p>
                        </div>
                        <div className={styles.botons_container}>
                            <button >Filtrar</button>
                            <button onClick={() => setShow(false)}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}