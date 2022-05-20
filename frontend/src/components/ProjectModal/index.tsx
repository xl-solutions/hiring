import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import { ContainerModal } from "./styles";

interface IProjectModal{
    name: string,
	purchasedAmount: number,
	purchasedAt: string,
	priceAtDate: number,
	lastPrice: number,
	capitalGains: number
}

export function ProjectModal(){
    // const [projectsGains, setProjectsGains] = useState<IProjectModal>();

    // Valores dos botões
    const [name, setName] = useState('')
    const [value, setValue] = useState(0);
    const [date, setDate] = useState('');

    // Valores Show
    const [nameShow, setNameShow] = useState('');
    const [purchasedAmountShow, setPurchasedAmount] = useState(0);
    const [purchasedAtShow, setPurchasedAt] = useState('');
    const [priceAtDateShow, setPriceAtDate] = useState(0);
    const [lastPriceShow, setLastPrice] = useState(0);
    const [capitalGainsShow, setCapitalGains] = useState(0);


    // function handleListProject(event: FormEvent){
    //     event.preventDefault();

    //     const data = {
    //         name,
    //         value,
    //         date
    //     };

    const send = async() =>{
        const response = await api.get(`/${name}/gains?purchasedAmount=${value}&purchasedAt=${date}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        });

        // setProjectsGains(response.data)

        setNameShow(response.data.name)
        setPurchasedAmount(response.data.purchasedAmount)
        setPurchasedAt(response.data.purchasedAt)
        setPriceAtDate(response.data.priceAtDate)
        setLastPrice(response.data.lastPrice)
        setCapitalGains(response.data.capitalGains)

    }
        
        
    // }

    // useEffect(() =>{
    //     api.get(`/${name}/gains?purchasedAmount=${value}&purchasedAt=${date}`)
    //     .then(response => setProjectsGains(response.data))
    // }, []);

    // console.log(projectsGains)
    return (
        <ContainerModal>
            {/* <form action="" method="get" onSubmit={handleListProject}> */}
                <div className="all">
                    <div className="search">

                    <input type="text"
                        placeholder="IBM"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <input type="number" 
                        placeholder="100" 
                        value={value}
                        onChange={event => setValue(Number(event.target.value))}
                    />

                    <input type="text"
                    placeholder="2022-02-22" 
                    value={date}
                    onChange={event => setDate(event.target.value)}
                    />

                    <button type="submit"
                    onClick={() => send()}>Buscar</button>

                    </div>

                    
                    <div className="results">
                        <h1>Resultados</h1>
                            <div className="results-show">
                                <p>Nome ação: {nameShow}</p>
                                <p>Quantidade: {purchasedAmountShow}</p>
                                <p>Data compra: {purchasedAtShow}</p>
                                <p>Preço da compra: {priceAtDateShow}</p>
                                <p>Preço recente:{lastPriceShow}</p>
                                <p>Ganhos ou perdas: {capitalGainsShow.toFixed(2)}</p> 
                            </div>
                    </div>
                </div>
        </ContainerModal>           
    );
}