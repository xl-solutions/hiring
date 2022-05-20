import { useState } from "react";
import { api } from "../../services/api";
import { ContainerModal } from "./styles";

export function CompareModal(){

    // Valores dos botões
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [name3, setName3] = useState('')
   
    // Valores Show
    const [compare, setCompare] = useState([]);

    const stocksArray = []

    stocksArray.push(name2,name3)

    const stocks = {
        "stocks": stocksArray
    };

    const send = async() =>{
        const response = await api.post(`/${name1}/compare`, stocks)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        });

        setCompare(response.data)
    }

    return (
        <ContainerModal>
            <div className="all">
                <div className="search">
                    <input type="text"
                    placeholder="OIBR4.SA"
                    value={name1}
                    onChange={event => setName1(event.target.value)} />

                    <input type="text" 
                    placeholder="TIMP3.SA"
                    value={name2}
                    onChange={event => setName2(event.target.value)} />

                    <input type="text" 
                    placeholder="VIVT4.SA"
                    value={name3}
                    onChange={event => setName3(event.target.value)} />

                    <button type="submit" onClick={send}>Buscar</button>
                </div>
                
                <div className="results">
                    <h1>Resultados</h1>
                    {compare.map((comp) =>{
                        return(
                            <div key={comp.name} className="results-show">
                                <p>Nome ação: {comp.name}</p>
                                <p>Quantidade: {comp.lastPrice} </p>
                                <p>Data compra: {comp.pricedAt}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </ContainerModal>
    );
}