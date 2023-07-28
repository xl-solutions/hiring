import Card from "../../../../../src/Frontend/components/commun/Card/index"
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
    const stock = {
        name: 'AAPL',
        price: 135.98,
        date: '21/04/2021'
    };
    const setAction = jest.fn();
    const setShow = jest.fn();
    test('deve exibir o nome e o preço da ação corretamente', () => {
        render(<Card stock={stock} setAction={setAction} setShow={setShow} />);

        const stockName = screen.getByText('AAPL');
        const stockPrice = screen.getByText('Preço 135.98');

        expect(stockName).toBeInTheDocument();
        expect(stockPrice).toBeInTheDocument();
    });

    test('deve chamar a função tradeInfos corretamente quando o botão for clicado', () => {
        render(<Card stock={stock} setAction={setAction} setShow={setShow} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(setAction).toHaveBeenCalledWith('AAPL');
        expect(setShow).toHaveBeenCalledWith(true);
    });

    test('deve atualizar o estado newStock corretamente quando a ação for atualizada', () => {
        const newStock = {
            name: 'GOOG',
            price: 2005.30,
            date: '21/04/2021'
        };
        render(<Card stock={stock} setAction={setAction} setShow={setShow} />);

        expect(screen.getByText('AAPL')).toBeInTheDocument();

        setNewStock(newStock);

        expect(screen.getByText('GOOG')).toBeInTheDocument();
        expect(screen.getByText('Preço 2005.30')).toBeInTheDocument();
    });
});

