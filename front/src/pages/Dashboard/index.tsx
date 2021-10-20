import React, { ChangeEvent, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Container } from './styles';
import Routes from '../../routes/dashboard.routes';
import Menu from '../../components/Menu';
import { useStocks } from '../../hooks/stocks';
import { Chart } from '../../components/Chart';
import Loading from '../../components/Loading';
import { useChart } from '../../hooks/chart';
import Input from '../../components/Input';

const Dashboard: React.FC = () => {
  const { stockName, setStockName } = useStocks();
  const { loading } = useChart();
  const { push, location } = useHistory();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setStockName(event.target.value);
    },
    [setStockName],
  );

  const handleKeyUpValue = useCallback(
    (event: any) => {
      if (event.key === 'Enter') {
        setStockName(event.target.value);
        const regex = location.pathname.split('/');

        push({ pathname: `/dashboard/${stockName}/${regex[3]}` });
      }
    },
    [setStockName, location.pathname, push, stockName],
  );

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      const regex = location.pathname.split('/');

      push({ pathname: `/dashboard/${event.target[0].value}/${regex[3]}` });
    },
    [location.pathname, push],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          icon={null}
          type="text"
          placeholder="Insere o nome da ação"
          className="input"
          value={stockName}
          onChange={handleChange}
          onKeyPress={handleKeyUpValue}
        />

        <Menu />

        <Routes />
      </form>

      {(loading && <Loading />) || <Chart />}
    </Container>
  );
};

export default Dashboard;
