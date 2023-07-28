import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../../../src/Frontend/components/patterns/Header/index';

describe('Header component', () => {
  test('renderiza o texto Meu Portifolio', () => {
    render(<Header />);
    const headerElement = screen.getByText('Meu Portifolio');
    expect(headerElement).toBeInTheDocument();
  });

  test('Deveria chamar a função handleAddStock', () => {
    const mockSetStocks = jest.fn();
    render(<Header setStocks={mockSetStocks} />);
    const buttonElement = screen.getByText('Incluir Ação');
    fireEvent.click(buttonElement);
    expect(mockSetStocks).toHaveBeenCalled();
  });


});