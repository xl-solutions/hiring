import { useCallback } from 'react';
import { MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { IState } from '../../store';
import { removeStockFromPortfolio } from '../../store/modules/portfolio/actions';
import { IPortfolioItem } from '../../store/modules/portfolio/types';
import { formatPriceBRL, formatPriceUSD } from '../../utils/formatPrice';
import { Container, ProductTable } from './styles';

export default function Portfolio() {
  const dispatch = useDispatch();
  const portfolio = useSelector<IState, IPortfolioItem[]>(
    (state) => state.portfolio.items
  );

  const handleDeleteStockFromPortfolio = useCallback(
    (stockName: string) => {
      dispatch(removeStockFromPortfolio(stockName));
    },
    [dispatch]
  );

  return (
    <>
      <Header />
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>EMPRESA</th>
              <th>PREÇO</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {portfolio.map((item) => (
              <tr key={item.stock.name} data-testid="stock">
                <td>
                  <strong>{item.stock.name}</strong>
                </td>
                <td>
                  <strong>{item.stock.company}</strong>
                </td>
                <td>
                  {item.stock.currency === 'BRL' ? (
                    <strong>{formatPriceBRL(item.stock.lastPrice)}</strong>
                  ) : (
                    <strong>{formatPriceUSD(item.stock.lastPrice)}</strong>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-stock"
                    onClick={() =>
                      handleDeleteStockFromPortfolio(item.stock.name)
                    }
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Container>
    </>
  );
}
