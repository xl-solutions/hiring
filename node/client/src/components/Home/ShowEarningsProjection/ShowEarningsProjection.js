import React from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import InputDate from '../../../components/Shared/InputDate/InputDate';
import InputSearch from '../../../components/Shared/InputSearch/InputSearch';
import InputNumber from '../../../components/Shared/InputNumber/InputNumber';
import Button from '../../../components/Shared/Button/Button';
import api from '../../../services/api';
import { SearchContainer } from './styled';
import Centralize from '../../Shared/Centralize/Centralize';
import TableContainer from '../../../assets/styles/components/TableContainer';
import { toUSD } from '../../../helpers/helpers';
import Loading from '../../Shared/Loading/Loading';

const ShowEarningsProjection = () => {
  const global = React.useContext(GlobalContext);
  const { addToPortfolio } = global;

  const [date, setDate] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [errors, setErrors] = React.useState(null);
  const [stock, setStock] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function getEarningsProjection() {
    let json;
    const options = {
      params: {
        purchasedAt: date,
        purchasedAmount: amount,
      },
    };

    try {
      setErrors(null);
      setLoading(true);
      const response = await api.get(`/stocks/${search}/gains`, options);
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
      <Centralize>
        <InputSearch
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Digite aqui a ação que deseja buscar.. (PETR4.SA, VALE5.SA)"
        />
      </Centralize>
      <SearchContainer>
        <InputNumber
          placeholder="Quantidade para compra... EX: (100)"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
        <InputDate
          label="Data final..."
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <Button
          onClick={getEarningsProjection}
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
                <th scope="col">Quantidade</th>
                <th scope="col">Data de compra</th>
                <th scope="col">Preço na data de compra</th>
                <th scope="col">Último preço</th>
                <th scope="col">Capitais ganhos</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stock.name}</td>
                <td>{stock.purchasedAmount}</td>
                <td>{new Date(stock.purchasedAt).toLocaleDateString()}</td>
                <td>{toUSD(stock.priceAtDate)}</td>
                <td>{toUSD(stock.lastPrice)}</td>
                <td>{toUSD(stock.capitalGains)}</td>
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
            </tbody>
          </table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

export default ShowEarningsProjection;
