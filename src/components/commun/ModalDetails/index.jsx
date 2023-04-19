import styles from "./styles.module.css"
export default function ModalDetail({show, setShow, highestPrice, lowestPrice, averagePrice }){
    
    return(
        <>
      {show && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal}>
            <div className={styles.text} >
            <h2>Informações de Preços</h2>
            <p>Maior Preço: R$ 34</p>
            <p>Menor Preço: R$ 234</p>
            <p>Preço Médio: R$ 24234</p>
            </div>
            <button onClick={() => setShow(false)}>Fechar</button>
          </div>
        </div>
      )}
    </>
    )
}