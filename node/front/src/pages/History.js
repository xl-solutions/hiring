import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { DetailHistory } from '../components/detailStock/DetailHistory';
import { validateFormHistory } from '../utils/validateFormHistory';
import useGetStocksNameFromApi from '../hooks/useGetStocksNameFromApi';

export const History = () => {
  const [formData, setFormData] = useState({});
  const [history, setHistory] = useState(); 
  const [errors, setErrors] = useState({}); 
  const handleOnChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }
  
  const [stocksName] = useGetStocksNameFromApi();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const {stock_name, from, to} = formData; 
    if(validateFormHistory(formData, errors, setErrors)){
      getHistory(stock_name, from, to)
      .then(response => {
        setHistory(response);
      })
      .catch(error => {console.log("Este es error: ", error)});
    }
  }
  const getHistory = async (stock_name, from, to) => {
      const history = await axios.get(`http://localhost:3001/stocks/${stock_name}/history?from=${from}&to=${to}`);
      return history.data;
  }
  return (
    <section>
        <h1>Cotações históricas</h1>
        <div className="container">
            <div className="row">
                <div className='col-md-8 offset-md-2'>
                    { history ? <DetailHistory history={history}/> : <span></span>}
                </div>
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <select className="form-select" onChange={handleOnChange} name="stock_name" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                {stocksName.map((stock, index) => <option value={stock} key={index}>{stock}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="from" type="date" placeholder="Desde" aria-label="default input example"/>
                          <span>{errors.from ? errors.from : "" }</span>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="to" type="date" placeholder="Até" aria-label="default input example"/>
                          <span>{errors.to ? errors.to : "" }</span>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver listado</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
