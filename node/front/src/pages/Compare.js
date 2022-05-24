import React from 'react'

export const Compare = () => {
  return (
    <section>
        <h1>Comparação entre valores</h1>
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
                            <select className="form-select" aria-label="Default select example" defaultValue>
                                <option value="">Procure seu símbolo</option>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                            </select>
                        </div>
                        <div className="mb-3"></div>
                        <button type="submit" className="btn btn-primary">Ver comparação</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
