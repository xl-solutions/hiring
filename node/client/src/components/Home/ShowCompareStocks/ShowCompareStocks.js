import React from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import InputSearch from '../../../components/Shared/InputSearch/InputSearch';
import Button from '../../../components/Shared/Button/Button';
import api from '../../../services/api';
import {
  SearchContainer,
  SelectedSearchContainer,
  SelectedSearchItem,
} from './styled';
import TableContainer from '../../../assets/styles/components/TableContainer';
import { toUSD } from '../../../helpers/helpers';
import Loading from '../../Shared/Loading/Loading';
import Centralize from '../../Shared/Centralize/Centralize';

const ShowCompareStocks = () => {
  const global = React.useContext(GlobalContext);
  const { addToPortfolio } = global;
  const [search, setSearch] = React.useState('');
  const [mainStock, setMainStock] = React.useState('');
  const [selectedSearches, setSelectedSearches] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const [stocks, setStocks] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function getStocks() {
    let json;
    const body = {
      stocks: selectedSearches,
    };

    try {
      setErrors(null);
      setLoading(true);
      const response = await api.post(`/stocks/${mainStock}/compare`, body);
      json = response.data;
    } catch (err) {
      json = null;
      setErrors(err);
    } finally {
      setStocks(json);
      setLoading(false);
      setSelectedSearches([]);
    }
  }

  function addSearches(stock) {
    setSelectedSearches([...selectedSearches, stock]);
    setSearch('');
  }

  return (
    <React.Fragment>
      <Centralize>
        <InputSearch
          value={mainStock}
          onChange={({ target }) => setMainStock(target.value)}
          placeholder="Digite aqui a companhia que deseja comparar (PETR4.SA, VALE5.SA)"
        />
      </Centralize>
      <SearchContainer>
        <InputSearch
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Digite aqui as ações que deseja comparar.. (PETR4.SA, VALE5.SA)"
        />
        <Button
          onClick={() => addSearches(search)}
          backgroundColor="green"
          margin="0 0 0 30px"
          color="#FFF"
        >
          Adicionar a lista
        </Button>
        <Button
          onClick={getStocks}
          backgroundColor="teal"
          margin="0 0 0 30px"
          color="#FFF"
        >
          {loading ? 'Carregando...' : 'Enviar'}
        </Button>
      </SearchContainer>

      {selectedSearches.length > 0 && (
        <React.Fragment>
          <Centralize>
            <h2>Ações selecionadas</h2>
          </Centralize>
          <SelectedSearchContainer>
            {selectedSearches.map((selected) => (
              <SelectedSearchItem key={selected}>{selected}</SelectedSearchItem>
            ))}
          </SelectedSearchContainer>
        </React.Fragment>
      )}

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
                <th scope="col">Último preço</th>
                <th scope="col">Data</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{toUSD(stock.lastPrice)}</td>
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

export default ShowCompareStocks;
