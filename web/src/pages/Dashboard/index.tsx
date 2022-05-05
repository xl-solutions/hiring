import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
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

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#fff',
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime' as const,
    axisBorder: {
      color: '#fff',
    },
    axisTicks: {
      color: '#fff',
    },
    categories: [
      '2022-04-20T00:00:00.000Z',
      '2022-04-21T00:00:00.000Z',
      '2022-04-22T00:00:00.000Z',
      '2022-04-23T00:00:00.000Z',
      '2022-04-24T00:00:00.000Z',
      '2022-04-25T00:00:00.000Z',
      '2022-04-26T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  tooltip: {
    enabled: false,
  },
};

const series = [{ name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  const [searchStockCompare, setSearchStockCompare] = useState('');
  const [resultStocks, setResultStocks] = useState([]);
  const [stocksFromCompare, setStocksFromCompare] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchStockCompare, 500);

  async function searchStockForCompare() {
    const response = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setResultStocks(response.data);
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

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResultStocks([]);
    } else {
      searchStockForCompare();
    }
  }, [debouncedSearch]);

  return (
    <Container>
      <Header />
      <Content>
        <GeneralInfo>
          <InfoStock>
            <h1>Apple Inc</h1>
            <span>$176.14</span>
            <Chart options={options} series={series} type="area" height={340} />
          </InfoStock>
          <Menu>
            <div>
              <h2>Adicionar ao meu portfólio</h2>
              <Item>
                <span>Quantidade</span>
                <input type="number" />
              </Item>
              <Item>
                <span>Preço de mercado</span>
                <span>$176.14</span>
              </Item>
              <hr />
              <Item>
                <span>Valor estimado</span>
                <span>$2,818.24</span>
              </Item>
            </div>
            <Button type="button" label="ADICIONAR" />
          </Menu>
        </GeneralInfo>
        <h1>Projeção de ganhos por compra</h1>
        <ProjectionGains>
          <Menu>
            <div>
              <Item>
                <span>Quantidade comprada</span>
                <input type="number" />
              </Item>
              <Item>
                <span>Preço de mercado</span>
                <span>$176.14</span>
              </Item>
              <hr />
              <Item>
                <span>Valor estimado</span>
                <span>$2,818.24</span>
              </Item>
            </div>
            <Button type="button" label="CALCULAR" />
          </Menu>
          <InfoStock>
            <Chart options={options} series={series} type="area" height={340} />
          </InfoStock>
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
        <h1>Comparar com outros ativos</h1>
        <CompareStock>
          <Menu>
            <div>
              <SearchBar
                value={searchStockCompare}
                setValue={setSearchStockCompare}
                stocks={resultStocks}
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
            <Chart options={options} series={series} type="area" height={340} />
          </InfoStock>
        </CompareStock>
      </Content>
    </Container>
  );
}
