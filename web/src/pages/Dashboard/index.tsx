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
import { BarChart } from '../../components/Charts/BarChart';

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

interface GainsByDateCurrentStockProps {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

interface LastPrice {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

interface InfoStocksCompareProps {
  lastPrices: LastPrice[];
}

export default function Dashboard() {
  const [currentStock, setCurrentStock] = useState<CurrentStockProps>({
    name: 'AAPL',
  });
  const [historicalPrice, setHistoricalPrice] =
    useState<HistoricalPriceProps>();
  const [searchStockCompare, setSearchStockCompare] = useState('');
  const [searchResultStocks, setSearchResultStocks] = useState([]);
  const [stocksFromCompare, setStocksFromCompare] = useState<string[]>([
    'FB',
    'NFLX',
    'MSFT',
  ]);
  const [infoStocksCompare, setInfoStocksCompare] =
    useState<InfoStocksCompareProps>();
  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
    subDays(new Date(), 7)
  );
  const [endDate, setEndDate] = useState<MaterialUiPickersDate>(new Date());
  const [purchasedAmount, setPurchasedAmount] = useState<number>(10);
  const [purchasedDate, setPurchasedDate] = useState<MaterialUiPickersDate>(
    subDays(new Date(), 16)
  );
  const [gainsByDateFromCurrentStock, setGainsByDateFromCurrentStock] =
    useState<GainsByDateCurrentStockProps>();

  const debouncedSearch = useDebounce(searchStockCompare, 500);

  async function searchStockForCompare() {
    const { data } = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setSearchResultStocks(data);
  }

  async function getHistoricalPriceFromStock(
    stock_name: string,
    from: string,
    to: string
  ) {
    const { data } = await api.get(`/${stock_name}/history`, {
      params: { from, to },
    });

    setHistoricalPrice(data);
  }

  const categoriesChartHistoricalPrice: string[] = [];
  const dataChartHistoricalPrice: number[] = [];
  const categoriesChartGainsByDate: string[] = [];
  const dataChartGainsByDate: number[] = [];

  historicalPrice?.prices.forEach((history) => {
    dataChartHistoricalPrice.push(history.closing);
    categoriesChartHistoricalPrice.push(history.pricedAt);
  });

  if (gainsByDateFromCurrentStock?.capitalGains) {
    categoriesChartGainsByDate.push(
      gainsByDateFromCurrentStock.purchasedAt,
      format(new Date(), 'yyyy-MM-dd')
    );

    dataChartGainsByDate.push(
      gainsByDateFromCurrentStock.priceAtDate,
      gainsByDateFromCurrentStock.lastPrice
    );
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

  async function searchQuoteFromStock(
    stock_name: string,
    stock_company?: string,
    stock_region?: string,
    stock_currency?: string
  ) {
    const { data } = await api.get(`/${stock_name}/quote`);
    setCurrentStock({
      name: stock_name,
      lastPrice: data.lastPrice,
      company: stock_company,
      region: stock_region,
      currency: stock_currency,
    });
  }

  async function getGainsByDate(
    stock_name: string,
    purchasedAmount: number,
    purchasedAt: string
  ) {
    setIsLoading(true);
    const { data } = await api
      .get(`/${stock_name}/gains`, {
        params: { purchasedAmount, purchasedAt },
      })
      .finally(() => {
        setIsLoading(false);
      });

    setGainsByDateFromCurrentStock(data);
  }

  async function compareCurrentStock() {
    setIsLoading(true);
    const { data } = await api
      .post(`/${currentStock.name}/compare`, {
        stocks: stocksFromCompare,
      })
      .finally(() => {
        setIsLoading(false);
      });

    setInfoStocksCompare(data);
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
    getGainsByDate(
      currentStock.name,
      purchasedAmount,
      format(purchasedDate, 'yyyy-MM-dd')
    );
    compareCurrentStock();
  }, [currentStock.name, startDate, endDate]);

  console.log(stocksFromCompare);

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
              <h3>SELECIONE O PERÍODO:</h3>
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
                <span>QUANTIDADE COMPRADA:</span>
                <input
                  type="number"
                  value={purchasedAmount}
                  onChange={(e) => setPurchasedAmount(Number(e.target.value))}
                />
              </Item>
              <DatePicker
                value={purchasedDate}
                setValue={setPurchasedDate}
                label="DATA DA COMPRA:"
              />
            </div>
            <Button
              type="button"
              label="CALCULAR"
              isLoading={isLoading}
              onClick={() =>
                getGainsByDate(
                  currentStock.name,
                  purchasedAmount,
                  format(purchasedDate, 'yyyy-MM-dd')
                )
              }
            />
          </Menu>
          <InfoStock>
            <BarChart
              name="chartGainsByDate"
              categories={categoriesChartGainsByDate}
              data={dataChartGainsByDate}
            />
          </InfoStock>
          <Menu>
            <div>
              <Item>
                <span>PREÇO NA DATA DA COMPRA:</span>
                <span>
                  {currentStock?.currency === 'BRL'
                    ? formatPriceBRL(gainsByDateFromCurrentStock?.priceAtDate)
                    : formatPriceUSD(gainsByDateFromCurrentStock?.priceAtDate)}
                </span>
              </Item>
              <Item>
                <span>PREÇO MAIS RECENTE:</span>
                <span>
                  {currentStock?.currency === 'BRL'
                    ? formatPriceBRL(gainsByDateFromCurrentStock?.lastPrice)
                    : formatPriceUSD(gainsByDateFromCurrentStock?.lastPrice)}
                </span>
              </Item>
              <hr />
            </div>
            <Item>
              <span>LUCRO/PREJUÍZO</span>
              <span>
                {currentStock?.currency === 'BRL'
                  ? formatPriceBRL(gainsByDateFromCurrentStock?.capitalGains)
                  : formatPriceUSD(gainsByDateFromCurrentStock?.capitalGains)}
              </span>
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
          <InfoStock>
            <BarChart
              name="chartGainsByDate"
              categories={categoriesChartGainsByDate}
              data={dataChartGainsByDate}
              horizontal
            />
          </InfoStock>
        </CompareStock>
      </Content>
    </Container>
  );
}
