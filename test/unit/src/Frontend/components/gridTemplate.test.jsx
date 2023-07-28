import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card', () => {
  const mockSetAction = jest.fn();
  const mockSetShow = jest.fn();

  const stock = {
    name: 'Empresa X',
    ticker: 'EMPX',
    price: 10.5,
  };

  test('renderiza corretamente as informações da ação', () => {
    render(<Card stock={stock} setAction={mockSetAction} setShow={mockSetShow} />);
    
    const stockName = screen.getByText('Empresa X');
    const stockTicker = screen.getByText('EMPX');
    const stockPrice = screen.getByText('R$ 10,50');

    expect(stockName).toBeInTheDocument();
    expect(stockTicker).toBeInTheDocument();
    expect(stockPrice).toBeInTheDocument();
  });

});