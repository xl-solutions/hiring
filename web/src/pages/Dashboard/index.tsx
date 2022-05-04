import { Header } from "../../components/Header";
import { Container, Content, GeneralInfo, InfoStock, Item, ProjectionGains, Menu } from "./styles";
import Chart from 'react-apexcharts';
import { Button } from "../../components/Button";

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
      opacityTo: 0.3
    },
  },
  tooltip: {
    enabled: false,
  },
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
];

export default function Dashboard() {
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
            <Button
              type="button"
              label="ADICIONAR"
            />
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
            <Button
              type="button"
              label="ADICIONAR"
            />
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
      </Content>
    </Container>
  )
}