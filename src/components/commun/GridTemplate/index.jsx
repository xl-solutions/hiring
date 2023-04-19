import Card from "../Card";
import styles from "./styles.module.css"
let arrAcoes = [
    {
        name: "BRA5T",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },{
        name: "Basdasd",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    }
]
export default function GridCard(){
    return(
        <div className={styles.grid}>
            {arrAcoes.map(acao => (<Card  acao={acao}/>))}
        </div>
    )
}