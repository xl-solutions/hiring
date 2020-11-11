import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [portfolio, setPortfolio] = React.useState(() => {
    const local = window.localStorage.getItem('portfolio');
    return local ? JSON.parse(local) : [];
  });

  function addToPortfolio(stock) {
    setPortfolio([...portfolio, stock]);
    alert('Ação adicionada no seu portfolio!');
  }

  function removeFromPortfolio(stockToRemove) {
    const newPortfolio = portfolio.filter((stock) => {
      return stock.name !== stockToRemove.name;
    });
    setPortfolio([...newPortfolio]);
    alert('Ação removida do seu portfolio!');
  }

  React.useEffect(() => {
    window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  return (
    <GlobalContext.Provider
      value={{
        portfolio,
        addToPortfolio,
        removeFromPortfolio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
