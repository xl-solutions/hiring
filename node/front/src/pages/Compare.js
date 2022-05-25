import React, {useState} from 'react';
import axios from 'axios';
import { DetailCompare } from '../components/detailStock/DetailCompare';

export const Compare = () => {
    const [formData, setFormData] = useState({});
    const [compare, setCompare] = useState(); 
    const handleOnChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const {stockName1, stockName2} = formData; 
    getCompare(stockName1, stockName2)
        .then(response => {
            setCompare(response);
        })
        .catch(error => {console.log("Este es error: ", error)});
  }
  const getCompare = async (stockName1, stockName2) => {
      const history = await axios.get("http://localhost:3001/stocks/" + stockName1 + "," + stockName2 + "/compare");
      return history.data;
  }
  return (
    <section>
        <h1>Comparação entre valores</h1>
        <div className="container">
            <div className="row">
            { compare ? (
                <div className='col-md-8 offset-md-2'>
                    <DetailCompare compare={compare}/>
                </div>
                ) : (
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <select className="form-select"  onChange={handleOnChange} name="stockName1" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                                <option value="TSLA">TSLA</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" onChange={handleOnChange} name="stockName2" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                                <option value="TSLA">TSLA</option>
                            </select>
                        </div>
                        <div className="mb-3"></div>
                        <button type="submit" className="btn btn-primary">Ver comparação</button>
                    </form>
                </div>
                )
            }
            </div>
        </div>
    </section>
  )
}
