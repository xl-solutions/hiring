import React from "react"
import styles from "./styles.module.css"
export default function TitleName() {
    return (
        <React.Fragment>
            <div className={styles.align}>
                <h1>Meu Portifolio</h1>
                <div className={styles.gap}>
                    <button>Incluir Ação</button>
                    <input />
                </div>
            </div>
        </React.Fragment>
    )
}