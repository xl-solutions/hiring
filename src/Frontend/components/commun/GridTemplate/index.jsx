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
        name: "Ba87989",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Bas123124",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Ba23123",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Bas456",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Ba45",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },
    {
        name: "Ba23",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    },{
        name: "Bas1",
        percent: "90",
        price: "900",
        dateTime: "12/04/2023"
    }
]
export default function GridCard({setAction, setShow}){
    return(
        <div className={styles.grid}>
            {arrAcoes.map(acao => (<Card key={acao.name}  acao={acao} setAction={setAction} setShow={setShow}/>))}
        </div>
    )
}