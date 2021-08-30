import React, {useState, createContext} from 'react';

const PortfolioContext = createContext();

function PortfolioProvider(props) {
  const [portfolio, setPortfolio] = useState([]);

  return (
    <PortfolioContext.Provider value={[portfolio, setPortfolio]}>
      {props.children}
    </PortfolioContext.Provider>
  );
}

export {PortfolioContext, PortfolioProvider};
