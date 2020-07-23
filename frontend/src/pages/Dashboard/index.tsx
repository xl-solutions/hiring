import React, { useState, useEffect, useCallback } from 'react';
import { FiTrendingUp, FiBarChart2, FiX, FiPlus } from 'react-icons/fi';
import Header from '../../components/Header';

import { Container, StockList, StockItem, SearchContainer } from './styles';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import api from '../../services/api';

interface StockInfo {
  name: string;
  lastPrice: number;
  priceAt: string;
}

const Dashboard: React.FC = () => {
  const [stockNames, setStockNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [stockText, setStockText] = useState('');
  const [stocks, setStocks] = useState<StockInfo[]>([]);

  useEffect(() => {
    async function loadStocks(): Promise<void> {
      const storeStockNames = localStorage.getItem('@Finances:stockNames');

      if (storeStockNames) {
        const parsedStockNames: string[] = JSON.parse(storeStockNames);
        const localStocks: StockInfo[] = [];

        for (const stockName of parsedStockNames) {
          const { data } = await api.get<StockInfo>(
            `/stocks/${stockName}/quote`,
          );

          localStocks.push(data);
        }

        setStocks(localStocks);
        setStockNames(parsedStockNames);
      }
    }

    loadStocks();
  }, []);

  useEffect(() => {
    localStorage.setItem('@Finances:stockNames', JSON.stringify(stockNames));
  }, [stockNames]);

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
          setStockNames([...stockNames, stockText]);
          setStockText('');
        } catch (err) {
          alert('Ops, algo deu errado, verifique o nome da ação');
        } finally {
          setLoading(false);
        }
      }
    },
    [stocks, stockText, stockNames],
  );

  const handleRemoveStock = useCallback(stockName => {
    setStocks(state => state.filter(stock => stock.name !== stockName));
    setStockNames(state => state.filter(stock => stock !== stockName));
  }, []);

  return (
    <>
      <Header />
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

        <StockList>
          {stocks.map(stock => (
            <StockItem key={stock.name}>
              <strong>{stock.name}</strong>
              <p>
                {formatValue(stock.lastPrice)}
                <span>
                  (Atualizado em {formatDate(new Date(stock.priceAt))})
                </span>
              </p>

              <div className="action-buttons">
                <button type="button">
                  <FiBarChart2 />
                  Historico
                </button>
                <button type="button">
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
