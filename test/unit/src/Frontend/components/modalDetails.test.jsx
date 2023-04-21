import { render, screen, fireEvent } from '@testing-library/react';
import ModalDetail from './ModalDetail';

describe('ModalDetail', () => {
  const mockSetShow = jest.fn();
  const mockDetails = { high: 10, low: 5 };
  const mockNameAction = 'AAPL';

  test('renderizar modal corretamente', () => {
    render(<ModalDetail show={true} setShow={mockSetShow} nameAction={mockNameAction} />);
    fireEvent.change(screen.getByLabelText(/Data de Início/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Data de Fim/i), { target: { value: '2022-01-10' } });
    fireEvent.click(screen.getByRole('button', { name: /Filtrar/i }));

    expect(screen.getByText(`Maior Preço: ${mockDetails.high}`)).toBeInTheDocument();
    expect(screen.getByText(`Menor Preço: ${mockDetails.low}`)).toBeInTheDocument();
    expect(screen.getByText(/Preço Médio/i)).toBeInTheDocument();
  });

});
