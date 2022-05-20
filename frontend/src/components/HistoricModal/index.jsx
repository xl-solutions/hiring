import { useState } from "react";
import { api } from "../../services/api";
import { ContainerModal } from "./styles";


export function HistoricModal(){

    // Valores dos botões
    const [name, setName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    // Valores Show
    const [historic, setHisotric] = useState([]);
    const [prices, setPrices] = useState();

    const send = async() =>{
        const response = await api.get(`/${name}/history?from=${from}&to=${to}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        });

        setHisotric(response.data)
        setPrices(response.data.prices)
        console.log(response.data)
        console.log(response.data.prices)

    }

    return (
        <ContainerModal>
            <div className="all">
                <div className="search">

                    <input type="text" 
                    placeholder="PETR4.SA"
                    value={name}
                    onChange={event => setName(event.target.value)} />

                    <input type="text" 
                    placeholder="2022-05-05"
                    value={from}
                    onChange={event => setFrom(event.target.value)} />

                    <input type="text" 
                    placeholder="2022-05-09"
                    value={to}
                    onChange={event => setTo(event.target.value)} />

                    <button type="submit" onClick={send}>Buscar</button>
                </div>

                
                <div className="results">
                    <div>
                        <h1>Resultados</h1>
                    </div>

                    <div className="div-results">
                        <p>Nome ação: {historic.name}</p>
                        {prices?.map((price) =>{
                            return(
                                <div key={price.pricedAt} className="results-show">
                                    <p>Aberta: {price.opening} </p>
                                    <p>Baixa: {price.low}</p>
                                    <p>Alta: {price.high}</p>
                                    <p>Fechada: {price.closing}</p>
                                    <p>Data: {price.pricedAt}</p>
                                </div>
                            )
                        })}
                    </div>
                    

                </div>
            </div>

        </ContainerModal>
    );
}