import React, {useState} from 'react';
import axios from 'axios';
import { DetailGains } from '../components/detailStock/DetailGains';
import useGetStocksNameFromApi from '../hooks/useGetStocksNameFromApi';
import { validateFormGains } from '../utils/validateFormGains';

export const Gains = () => {
  const [formData, setFormData] = useState({});
  const [gains, setGains] = useState(); 
  const [errors, setErrors] = useState({}); 
  const handleOnChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }  
  
  const [stocksName] = useGetStocksNameFromApi();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const {stock_name, purchasedAmount, purchasedAt} = formData; 

    if(validateFormGains(formData, errors, setErrors)){
      getGains(stock_name, purchasedAmount, purchasedAt)
          .then(response => {
            setGains(response);
          })
          .catch(error => {console.log("Este es error: ", error)});
    }
  }
  const getGains = async (stock_name, purchasedAmount, purchasedAt) => {
      const gains = await axios.get("http://localhost:3001/stocks/" + stock_name + "/gains?purchasedAmount=" + purchasedAmount + "&purchasedAt=" + purchasedAt);
      return gains.data;
  }
  return (
    <section>
        <h1>Lucro obtido</h1>
        <div className="container">
            <div className="row">
              { gains ? (
                <div className='col-md-8 offset-md-2'>
                    <DetailGains gains={gains}/>
                </div>
                ) : (
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <select className="form-select" onChange={handleOnChange} name="stock_name" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                {stocksName.map((stock, index) => <option value={stock} key={index}>{stock}</option>)}
                            </select>
                            <span className="text-danger">{errors.stock_name ? errors.stock_name : "" }</span>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="purchasedAmount" className="form-label">Quantidade de açoes compradas:</label>
                          <input className="form-control" onChange={handleOnChange} id="purchasedAmount" name="purchasedAmount" type="number"/>
                          <span className="text-danger">{errors.purchasedAmount ? errors.purchasedAmount : "" }</span>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="purchasedAt" className="form-label">Data da compra:</label>
                          <input className="form-control" onChange={handleOnChange} id="purchasedAt" name="purchasedAt" type="date"/>
                          <span className="text-danger">{errors.purchasedAt ? errors.purchasedAt : "" }</span>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver resultado</button>
                    </form>
                </div>
                )
              }
            </div>
        </div>
    </section>
  )
}
