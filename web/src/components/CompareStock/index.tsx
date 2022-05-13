import { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../services/api';
import { IState } from '../../store';
import { IStock } from '../../store/modules/currentStock/types';
import { Button } from '../Button';
import { BarChart } from '../Charts/BarChart';
import { SearchBar } from '../SearchBar';
import { Container, IconDelete, InfoStock, Menu } from './styles';

interface LastPrice {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

interface InfoStocksCompareProps {
  lastPrices: LastPrice[];
}

export function CompareStock() {
  const stock = useSelector<IState, IStock>(
    (state) => state.currentStock.stock
  );
  const [searchStockCompare, setSearchStockCompare] = useState('');
  const [searchResultStocks, setSearchResultStocks] = useState([]);
  const [stocksFromCompare, setStocksFromCompare] = useState<string[]>([]);
  const [infoStocksCompare, setInfoStocksCompare] =
    useState<InfoStocksCompareProps>();
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchStockCompare, 500);

  async function searchStockForCompare() {
    const { data } = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setSearchResultStocks(data);
  }

  async function compareCurrentStock() {
    setIsLoading(true);
    const { data } = await api
      .post(`/${stock.name}/compare`, {
        stocks: stocksFromCompare,
      })
      .finally(() => {
        setIsLoading(false);
      });

    setInfoStocksCompare(data);
  }

  function addToStockCompare(stock_name: string) {
    setStocksFromCompare([...stocksFromCompare, stock_name]);
    setSearchStockCompare('');
  }

  function removeStockFromCompare(stock_name: string) {
    setStocksFromCompare(
      stocksFromCompare.filter((e) => e !== `${stock_name}`)
    );
  }

  const categoriesChartCompareStocks: string[] = [];
  const dataChartCompareStocks: number[] = [];

  infoStocksCompare?.lastPrices.forEach((stock) => {
    categoriesChartCompareStocks.push(stock.name);
    dataChartCompareStocks.push(stock.lastPrice);
  });

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResultStocks([]);
    } else {
      searchStockForCompare();
    }
  }, [debouncedSearch]);

  return (
    <Container>
      <Menu>
        <div>
          <SearchBar
            value={searchStockCompare}
            setValue={setSearchStockCompare}
            stocks={searchResultStocks}
            setStocks={setSearchResultStocks}
            placeholder="Adicione os ativos que deseja comparar"
            fetchData={addToStockCompare}
          />
          {stocksFromCompare.length > 0 &&
            stocksFromCompare.map((stock) => (
              <div id="stock-compare" key={stock}>
                <p>{stock}</p>
                <button
                  type="button"
                  onClick={() => removeStockFromCompare(stock)}
                >
                  <IconDelete as={RiDeleteBin5Fill} />
                </button>
              </div>
            ))}
        </div>
        <Button
          type="button"
          label="COMPARAR"
          isLoading={isLoading}
          onClick={compareCurrentStock}
          disabled={!stocksFromCompare.length}
        />
      </Menu>
      <InfoStock>
        <BarChart
          name="chartCompareStocks"
          categories={categoriesChartCompareStocks}
          data={dataChartCompareStocks}
          horizontal
        />
      </InfoStock>
    </Container>
  );
}
