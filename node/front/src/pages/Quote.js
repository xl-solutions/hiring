import React, {useState} from 'react';
import axios from 'axios'; 
import { DetailQuote } from '../components/detailStock/DetailQuote';
import useGetStocksNameFromApi from '../hooks/useGetStocksNameFromApi';
import { validateFormQuote } from '../utils/validateFormQuote'


export const Quote = () => {
    const [stock_name, setStockName] = useState("none"); 
    const [quote, setQuote] = useState(); 
    const [stocksName] = useGetStocksNameFromApi();
    const [errors, setErrors] = useState({}); 

    const handleOnChange = (event) => {
        setStockName(event.target.value);
    }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (validateFormQuote(stock_name, errors, setErrors)) {
    getQuote(stock_name)
        .then(response => {
            setQuote(response);
        })
        .catch(error => {console.log("Este es error: ", error)});
    }
  }
  const getQuote = async (stock_name) => {
      const quote = await axios.get("http://localhost:3001/stocks/" + stock_name + "/quote");
      return quote.data;
  }
  return (
    <section>
        <h1>Cotações</h1>
        <div className="container">
            <div className="row">
                <div className='col-md-8 offset-md-2'>
                    { quote ? <DetailQuote quote={quote}/> : <span></span>}
                </div>
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <select className="form-select" onChange={handleOnChange} aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                {stocksName.map((stock, index) => <option value={stock} key={index}>{stock}</option>)}
                            </select>
                            <span>{errors.name ? errors.name : "" }</span>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver preço atual</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
