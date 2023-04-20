import { useState } from "react"
import styles from "./styles.module.css"
import { getHistoricalPrice } from "../../../api/api"

export default function ModalDetail({ show, setShow, nameAction }) {
    const [details, setDetails] = useState({})
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const handlerDateFrom = (event) => {

        setFrom(event.target.value)
    }
    const handlerDateTo = (event) => {

        setTo(event.target.value)
    }

    const handleHistoricalPrices = async () => {
        try {
            const response = await getHistoricalPrice(nameAction, from, to)
            setDetails(response)
        } catch (error) {
            throw error
        }
    };
    return (
        <>
            {show && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                        <h2>Informações de Preços da {nameAction}</h2>
                        <div className={styles.container_data}>
                            <label htmlFor="data-inicio">Data de Início:</label>
                            <input type="date" id="data-inicio" name="data-inicio" value={from} onChange={handlerDateFrom} />
                            <label htmlFor="data-fim">Data de Fim:</label>
                            <input type="date" id="data-fim" name="data-fim" value={to} onChange={handlerDateTo} />
                        </div>
                        <div className={styles.text} >
                            <p>Maior Preço: {details.high}</p>
                            <p>Menor Preço: {details.low}</p>
                            <p>Preço Médio: { }</p>
                        </div>
                        <div className={styles.botons_container}>
                            <button onClick={handleHistoricalPrices} >Filtrar</button>
                            <button onClick={() => setShow(false)}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}