import { useMenu } from 'context/menu/MenuContext';
import { usePortfolio } from 'hooks/stocks';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { QuoteData } from 'interfaces';

import { removePortifolio } from 'store/actions/stocks';
import { Container } from './styled';

const PortfolioPage: React.FC = () => {
  const dispatch = useDispatch();

  const { handleSetPageName } = useMenu();

  const portfolio = usePortfolio();

  const handleRemovePortifolio = React.useCallback(
    (data: QuoteData) => {
      dispatch(removePortifolio(data));
    },
    [dispatch]
  );

  React.useEffect(() => {
    handleSetPageName('Portifólio');
  }, [handleSetPageName]);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {portfolio?.map(({ name, lastPrice, pricedAt }, index) => (
            <tr>
              <td>{name}</td>
              <td>
                {lastPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>{new Date(pricedAt).toLocaleDateString('pt-BR')}</td>
              <td align="right">
                <FaTrash
                  size={20}
                  onClick={() =>
                    handleRemovePortifolio({ name, lastPrice, pricedAt })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default PortfolioPage;
