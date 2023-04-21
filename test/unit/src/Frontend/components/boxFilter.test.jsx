import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getGains } from '../api';
import FilterBox from '../FilterBox';

jest.mock('../api');

describe('FilterBox', () => {
  const mockGains = {
    stock_name: 'EMPX',
    purchased_amount: 10,
    purchased_at: '2021-01-01',
    price_at_date: 15,
    latest_price: 20,
    gains: 50,
  };

  beforeEach(() => {
    getGains.mockResolvedValue(mockGains);
  });

  test('renderiza corretamente as entradas e o botão de cálculo', () => {
    render(<FilterBox />);
    
    const stockNameInput = screen.getByLabelText('Nome da Ação:');
    const purchasedAmountInput = screen.getByLabelText('Quantia de cotas:');
    const purchasedAtInput = screen.getByLabelText('Data de compra:');
    const calculateButton = screen.getByRole('button', { name: 'Calcular' });

    expect(stockNameInput).toBeInTheDocument();
    expect(purchasedAmountInput).toBeInTheDocument();
    expect(purchasedAtInput).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });

  
});
