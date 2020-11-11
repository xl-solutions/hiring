import React from 'react';
import Title from '../../components/Shared/Title/Title';
import TableContainer from '../../assets/styles/components/TableContainer';
import Container from '../../assets/styles/components/Container';
import Button from '../../components/Shared/Button/Button';
import { GlobalContext } from '../../context/GlobalContext';
import Centralize from '../../components/Shared/Centralize/Centralize';
import { toUSD } from '../../helpers/helpers';

const Portfolio = () => {
  const global = React.useContext(GlobalContext);
  const { portfolio, removeFromPortfolio } = global;

  return (
    <Container>
      <Title>Meu portfólio</Title>
      {portfolio.length === 0 && (
        <Centralize>
          <h2 style={{ marginTop: '60px' }}>Não há nada no seu portfólio</h2>
        </Centralize>
      )}
      {portfolio.length > 0 && (
        <TableContainer>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preço atual</th>
                <th scope="col">Data</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock) => (
                <tr key={stock.name}>
                  <td>{stock.name}</td>
                  <td>{toUSD(stock.lastPrice)}</td>
                  <td>{new Date(stock.pricedAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      color="#fff"
                      backgroundColor="red"
                      onClick={() => removeFromPortfolio(stock)}
                    >
                      Remover do portfólio
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Portfolio;
