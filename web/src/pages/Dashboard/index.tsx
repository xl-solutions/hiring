import { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format, subDays } from 'date-fns';
import { Header } from '../../components/Header';
import {
  Container,
  Content,
  GeneralInfo,
  InfoStock,
  Item,
  ProjectionGains,
  Menu,
  CompareStock,
  IconDelete,
} from './styles';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import api from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import { AreaChart } from '../../components/Charts/AreaChart';
import { DatePicker } from '../../components/DatePicker';
import { formatPriceUSD, formatPriceBRL } from '../../utils/formatPrice';

interface Pricing {
  opening: number;
  high: number;
  closing: number;
  pricedAt: string;
}

interface HistoricalPriceProps {
  name: string;
  prices: Pricing[];
}

interface CurrentStockProps {
  name: string;
  lastPrice?: number;
  company?: string;
  region?: string;
  currency?: string;
}

export default function Dashboard() {
  const [currentStock, setCurrentStock] = useState<CurrentStockProps>({
    name: 'AAPL',
  });
  const [historicalPrice, setHistoricalPrice] =
    useState<HistoricalPriceProps>();
  const [searchStockCompare, setSearchStockCompare] = useState('');
  const [searchResultStocks, setSearchResultStocks] = useState([]);
  const [stocksFromCompare, setStocksFromCompare] = useState<string[]>([]);

  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
    subDays(new Date(), 7)
  );
  const [endDate, setEndDate] = useState<MaterialUiPickersDate>(new Date());

  const debouncedSearch = useDebounce(searchStockCompare, 500);

  async function searchStockForCompare() {
    const response = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setSearchResultStocks(response.data);
  }

  async function getHistoricalPriceFromStock(
    stock_name: string,
    from: string,
    to: string
  ) {
    const response = await api.get(`/${stock_name}/history`, {
      params: { from, to },
    });

    setHistoricalPrice(response.data);
  }

  const categoriesChartHistoricalPrice: string[] = [];
  const dataChartHistoricalPrice: number[] = [];

  historicalPrice?.prices.forEach((history) => {
    dataChartHistoricalPrice.push(history.closing);
    categoriesChartHistoricalPrice.push(history.pricedAt);
  });

  function addToStockCompare(stock_name: string) {
    setStocksFromCompare([...stocksFromCompare, stock_name]);
    setSearchStockCompare('');
  }

  function removeStockFromCompare(stock_name: string) {
    setStocksFromCompare(
      stocksFromCompare.filter((e) => e !== `${stock_name}`)
    );
  }

  async function searchQuoteFromStock(
    stock_name: string,
    stock_company?: string,
    stock_region?: string,
    stock_currency?: string
  ) {
    const response = await api.get(`/${stock_name}/quote`);
    setCurrentStock({
      name: stock_name,
      lastPrice: response.data.lastPrice,
      company: stock_company,
      region: stock_region,
      currency: stock_currency,
    });
  }

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResultStocks([]);
    } else {
      searchStockForCompare();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    getHistoricalPriceFromStock(
      currentStock.name,
      format(startDate, 'yyyy-MM-dd'),
      format(endDate, 'yyyy-MM-dd')
    );
  }, [currentStock, startDate, endDate]);

  return (
    <Container>
      <Header fetchData={searchQuoteFromStock} />
      <Content>
        <GeneralInfo>
          <InfoStock>
            <h1 id="company-name">
              {currentStock.company ? currentStock.company : 'Apple Inc'} (
              {currentStock.name})
            </h1>
            {currentStock.lastPrice && (
              <span id="price">
                {currentStock.currency === 'USD'
                  ? formatPriceUSD(currentStock.lastPrice)
                  : formatPriceBRL(currentStock.lastPrice)}
              </span>
            )}
            <AreaChart
              name="chartHistoricalPrice"
              categories={categoriesChartHistoricalPrice}
              data={dataChartHistoricalPrice}
            />
          </InfoStock>
          <Menu>
            <div>
              <h3>Selecione o período:</h3>
              <DatePicker
                value={startDate}
                setValue={setStartDate}
                label="INÍCIO EM:"
              />
              <DatePicker
                value={endDate}
                setValue={setEndDate}
                label="TÉRMINO EM:"
              />
            </div>
            <Button type="button" label="ADICIONAR AO PORTFÓLIO" />
          </Menu>
        </GeneralInfo>
        <h2>Projeção de ganhos por compra</h2>
        <ProjectionGains>
          <Menu>
            <div>
              <Item>
                <span>Quantidade comprada</span>
                <input type="number" />
              </Item>
              <DatePicker
                value={startDate}
                setValue={setStartDate}
                label="DATA DA COMPRA:"
              />
            </div>
            <Button type="button" label="CALCULAR" />
          </Menu>
          <InfoStock>{/* <AreaChart /> */}</InfoStock>
          <Menu>
            <div>
              <Item>
                <span>Preço na data da compra</span>
                <span>$176.14</span>
              </Item>
              <Item>
                <span>Preço mais recente</span>
                <span>$240.14</span>
              </Item>
              <hr />
            </div>
            <Item>
              <span>Lucro/Prejuízo</span>
              <span>$2,818.24</span>
            </Item>
          </Menu>
        </ProjectionGains>
        <h2>Comparar com outros ativos</h2>
        <CompareStock>
          <Menu>
            <div>
              <SearchBar
                value={searchStockCompare}
                setValue={setSearchStockCompare}
                stocks={searchResultStocks}
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
            <Button type="button" label="COMPARAR" />
          </Menu>
          <InfoStock>{/* <AreaChart /> */}</InfoStock>
        </CompareStock>
      </Content>
    </Container>
  );
}
