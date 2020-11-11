import React from 'react';
import InputSearch from '../../Shared/InputSearch/InputSearch';
import Button from '../../Shared/Button/Button';
import { SearchContainer } from './styled';
import api from '../../../services/api';
import Centralize from '../../Shared/Centralize/Centralize';
import TableContainer from '../../../assets/styles/components/TableContainer';
import { GlobalContext } from '../../../context/GlobalContext';
import { toUSD } from '../../../helpers/helpers';
import Loading from '../../Shared/Loading/Loading';

const ShowLastPrice = () => {
  const global = React.useContext(GlobalContext);
  const { addToPortfolio } = global;

  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [stock, setStock] = React.useState(null);

  async function getStocks() {
    let json;

    try {
      setErrors(null);
      setLoading(true);
      const response = await api.get(`/stocks/${search}/quote`);
      json = response.data;
    } catch (err) {
      json = null;
      setErrors(err);
    } finally {
      setStock(json);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <SearchContainer>
        <InputSearch
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Digite aqui a ação que deseja buscar.. (PETR4.SA, VALE5.SA)"
        />
        <Button
          onClick={getStocks}
          backgroundColor="teal"
          margin="0 0 0 30px"
          color="#FFF"
        >
          {loading ? 'Carregando...' : 'Enviar'}
        </Button>
      </SearchContainer>

      {loading && <Loading />}

      {errors && (
        <Centralize>
          <h4>Não foi possível encontrar a ação pesquisada</h4>
        </Centralize>
      )}

      {!loading && !errors && stock && (
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
              <tr>
                <td>{stock.name}</td>
                <td>{toUSD(stock.lastPrice)}</td>
                <td>{new Date(stock.pricedAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    color="#fff"
                    backgroundColor="green"
                    onClick={() => addToPortfolio(stock)}
                  >
                    Incluir no portfólio
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

export default ShowLastPrice;
