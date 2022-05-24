import React from 'react'

export const Gains = () => {
  return (
    <section>
        <h1>Lucro obtido</h1>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form>
                        <div className="mb-3">
                            <select className="form-select" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                            </select>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" type="text" placeholder="Quantidade de açoes compradas" aria-label="default input example"/>
                        </div>
                        <div className="mb-3">
                          <input className="form-control" type="text" placeholder="Data da compra" aria-label="default input example"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ver cotação histórica</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
