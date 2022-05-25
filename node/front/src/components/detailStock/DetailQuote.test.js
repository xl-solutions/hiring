import { fireEvent, render, screen } from '@testing-library/react';
import React, {useState} from 'react';
import { PortfolioContext } from '../../contexts/PortfolioContext';
import {DetailQuote} from './DetailQuote';

const ContextComponents = () => {
    const [portfolio, setPortfolio] = useState([]);
    const quote = {name: "AAPL", lastPrice: 138.56, pricedAt: "2022-05-25T17:00:00+0000"};
    return (
      <PortfolioContext.Provider value={{portfolio, setPortfolio}}>
            <DetailQuote quote={quote} />
      </PortfolioContext.Provider>
    );
}
test('event on click', () => {
  render(<ContextComponents />);
  //console.log(screen.getByText(/Adicionar ao Portfolio/i));
  const buttonAdd = screen.getByText(/Adicionar ao Portfolio/i);
  fireEvent.click(buttonAdd);
  expect(screen.getByText("A alteração foi feita com sucesso!")).toBeInTheDocument();
});
