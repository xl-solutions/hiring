import React, {useState} from 'react';
import axios from 'axios';
import { DetailHistory } from '../components/detailStock/DetailHistory';

export const History = () => {
  const [formData, setFormData] = useState({});
  const [history, setHistory] = useState(); 
  const handleOnChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData.from);
    const {stock_name, from, to} = formData; 
    getHistory(stock_name, from, to)
        .then(response => {
          setHistory(response);
        })
        .catch(error => {console.log("Este es error: ", error)});
  }
  const getHistory = async (stock_name, from, to) => {
      console.log("entra a getQuote con: ", stock_name);
      const history = await axios.get(`http://localhost:3001/stocks/${stock_name}/history?from=${from}&to=${to}`);
      console.log("llama al siguiente ulr: ", history);
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
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                            </select>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="from" type="date" placeholder="Desde" aria-label="default input example"/>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="to" type="date" placeholder="Até" aria-label="default input example"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver listado</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
