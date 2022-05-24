import React, {useState, useEffect} from 'react';
import axios from 'axios'; 

export const Quote = () => {
  const [stock_name, setStockName] = useState("none"); 
  const handleOnChange = (event) => {
      setStockName(event.target.value);
  }
  const handleOnSubmit = (event) => {
    event.preventDefault();
    getQuote(stock_name).then(quote => {console.log("esta es la info: ", quote)}).catch(error => {console.log("Este es error: ", error)});
  }
  const getQuote = async (stock_name) => {
      console.log("entra a getQuote con: ", stock_name);
      const quote = await axios.get("http://localhost:3001/stocks/" + stock_name + "/quote");
      console.log("llama al siguiente ulr: ", quote);
  }
  return (
    <section>
        <h1>Cotações</h1>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <select className="form-select" onChange={handleOnChange} aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver preço atual</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
