import React, { useState, useEffect, useCallback } from 'react';
import { FiTrendingUp, FiBarChart2, FiX, FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import api from '../../services/api';

import { Container, StockList, StockItem, SearchContainer } from './styles';
import Loading from '../../components/Loading';

interface StockInfo {
  name: string;
  lastPrice: number;
  priceAt: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [stockText, setStockText] = useState('');
  const [stocks, setStocks] = useState<StockInfo[]>([]);

  const handleUpdateStocks = useCallback(async localStocks => {
    const updatedStocks: StockInfo[] = [];

    for (const localStock of localStocks) {
      const { data } = await api.get<StockInfo>(
        `/stocks/${localStock.name}/quote`,
      );

      updatedStocks.push(data);
    }

    setStocks(updatedStocks);
  }, []);

  useEffect(() => {
    const storeStocks = localStorage.getItem('@Finances:stocks');

    if (storeStocks) {
      const parsedStocks: StockInfo[] = JSON.parse(storeStocks);
      setStocks(parsedStocks);

      handleUpdateStocks(parsedStocks);
    }
  }, [handleUpdateStocks]);

  useEffect(() => {
    localStorage.setItem('@Finances:stocks', JSON.stringify(stocks));
  }, [stocks]);

  const handleAddStock = useCallback(
    async e => {
      e.preventDefault();

      if (stockText) {
        try {
          setLoading(true);

          const { data } = await api.get<StockInfo>(
            `/stocks/${stockText}/quote`,
          );

          setStocks([...stocks, data]);
          setStockText('');
        } catch (err) {
          alert('Ops, algo deu errado, verifique o nome da ação');
        } finally {
          setLoading(false);
        }
      }
    },
    [stocks, stockText],
  );

  const handleRemoveStock = useCallback(stockName => {
    setStocks(state => state.filter(stock => stock.name !== stockName));
  }, []);

  const handleNavigateToHistory = useCallback(
    stockName => {
      history.push(`/history/${stockName}`);
    },
    [history],
  );

  const handleNavigateToProjection = useCallback(
    stockName => {
      history.push(`/projection/${stockName}`);
    },
    [history],
  );

  return (
    <>
      <Header isHome />
      <Container>
        <SearchContainer>
          <form onSubmit={handleAddStock}>
            <input
              type="text"
              placeholder="Digite o nome da ação"
              value={stockText}
              onChange={e => setStockText(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              <FiPlus />
              Adicionar
            </button>
          </form>
        </SearchContainer>

        {loading && <Loading />}

        <StockList>
          {stocks.map((stock, index) => (
            <StockItem key={index}>
              <strong>{stock.name}</strong>
              <p>
                {formatValue(stock.lastPrice)}
                <span>
                  (Atualizado em {formatDate(new Date(stock.priceAt))})
                </span>
              </p>

              <div className="action-buttons">
                <button
                  type="button"
                  onClick={() => handleNavigateToHistory(stock.name)}
                >
                  <FiBarChart2 />
                  Histórico
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateToProjection(stock.name)}
                >
                  <FiTrendingUp />
                  Projeção
                </button>
              </div>

              <FiX onClick={() => handleRemoveStock(stock.name)} />
            </StockItem>
          ))}
        </StockList>
      </Container>
    </>
  );
};

export default Dashboard;
