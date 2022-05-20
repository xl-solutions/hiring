import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { ContainerModal } from "./styles";

export function RecentModal(){
    const [name, setName] = useState('')

    const [nameShow, setNameShow] = useState('');
    const [lastPriceShow, setLastPrice] = useState(0);
    const [pricedAtShow, setPricedAt] = useState('');

    const send = async() =>{
        const response = await api.get(`/${name}/quote`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        });

        setNameShow(response.data.name)
        setLastPrice(response.data.lastPrice)
        setPricedAt(response.data.pricedAt)
    }


    return (
        <ContainerModal>
            <div className="all">
                <div className="search">
                    <input type="text"
                    placeholder="PETR4.SA"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    />

                    <button type="submit"
                    onClick={() => send()}>Buscar</button>
                </div>
                

                <div className="results">
                    <h1>Resultados</h1>
                        <div className="results-show">
                            <p>Nome ação: {nameShow}</p>
                            <p>Ultimo Preço: {lastPriceShow}</p>
                            <p>Data: {pricedAtShow}</p>
                        </div>

                </div>
            </div>
                  
        </ContainerModal>
    );
}