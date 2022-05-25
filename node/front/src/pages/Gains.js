import React, {useState} from 'react';
import axios from 'axios';
import { DetailGains } from '../components/detailStock/DetailGains';

export const Gains = () => {
  const [formData, setFormData] = useState({});
  const [gains, setGains] = useState(); 
  const handleOnChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const {stock_name, purchasedAmount, purchasedAt} = formData; 
    getGains(stock_name, purchasedAmount, purchasedAt)
        .then(response => {
          setGains(response);
        })
        .catch(error => {console.log("Este es error: ", error)});
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
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                                <option value="TSLA">TSLA</option>
                            </select>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="purchasedAmount" type="number" placeholder="Quantidade de açoes compradas" aria-label="default input example"/>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" onChange={handleOnChange} name="purchasedAt" type="date" placeholder="Data da compra" aria-label="default input example"/>
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
