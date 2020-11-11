import React from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import InputDate from '../../../components/Shared/InputDate/InputDate';
import InputSearch from '../../../components/Shared/InputSearch/InputSearch';
import Button from '../../../components/Shared/Button/Button';
import api from '../../../services/api';
import { SearchContainer } from './styled';
import Centralize from '../../Shared/Centralize/Centralize';
import TableContainer from '../../../assets/styles/components/TableContainer';
import { toUSD } from '../../../helpers/helpers';
import Loading from '../../Shared/Loading/Loading';

const ShowHistoricalPrice = () => {
  const global = React.useContext(GlobalContext);
  const { addToPortfolio } = global;

  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [errors, setErrors] = React.useState(null);
  const [stocks, setStocks] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function getStocks() {
    let json;
    const options = {
      params: {
        from: dateFrom,
        to: dateTo,
      },
    };

    try {
      setErrors(null);
      setLoading(true);
      const response = await api.get(`/stocks/${search}/history`, options);
      json = response.data;
    } catch (err) {
      json = null;
      setErrors(err);
    } finally {
      setStocks(json);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Centralize>
        <InputSearch
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Digite aqui a ação que deseja buscar.. (PETR4.SA, VALE5.SA)"
        />
      </Centralize>
      <SearchContainer>
        <InputDate
          label="Data inicial..."
          value={dateFrom}
          onChange={({ target }) => setDateFrom(target.value)}
        />
        <InputDate
          label="Data final..."
          value={dateTo}
          onChange={({ target }) => setDateTo(target.value)}
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

      {!loading && !errors && stocks && (
        <TableContainer>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Opening</th>
                <th scope="col">Low</th>
                <th scope="col">High</th>
                <th scope="col">Closing</th>
                <th scope="col">Data</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
              {stocks.prices.map((stock, index) => (
                <tr key={index}>
                  <td>{stocks.name}</td>
                  <td>{toUSD(stock.opening)}</td>
                  <td>{toUSD(stock.low)}</td>
                  <td>{toUSD(stock.high)}</td>
                  <td>{toUSD(stock.closing)}</td>
                  <td>{new Date(stock.pricedAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      color="#fff"
                      backgroundColor="green"
                      onClick={() => addToPortfolio(stock)}
                    >
                      Adicionar no portfólio
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

export default ShowHistoricalPrice;
