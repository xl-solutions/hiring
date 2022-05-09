import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format, subDays } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { CurrentStockProps } from '../../pages/Dashboard';
import api from '../../services/api';
import { IState } from '../../store';
import { addStockToPortfolioRequest } from '../../store/modules/portfolio/actions';
import { IStock } from '../../store/modules/portfolio/types';
import { formatPriceBRL, formatPriceUSD } from '../../utils/formatPrice';
import { Button } from '../Button';
import { AreaChart } from '../Charts/AreaChart';
import { DatePicker } from '../DatePicker';
import { Container, InfoStock, Menu } from './styles';

interface Pricing {
  opening: number;
  high: number;
  closing: number;
  pricedAt: string;
}

export function GeneralStockInfo() {
  const dispatch = useDispatch();
  const stock = useSelector<IState, IStock>(
    (state) => state.currentStock.stock
  );
  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
    subDays(new Date(), 10)
  );
  const [endDate, setEndDate] = useState<MaterialUiPickersDate>(new Date());

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.portfolio.failedStockCheck.includes(stock.name);
  });

  const handleAddStockToPortfolio = useCallback(
    (stock: IStock) => {
      if (hasFailedStockCheck) {
        toast.error('Este ativo já está no seu portfólio');
      }
      dispatch(addStockToPortfolioRequest(stock));
    },
    [dispatch, hasFailedStockCheck]
  );

  async function getHistoricalPriceFromStock() {
    const { data } = await api.get(`/${stock.name}/history`, {
      params: {
        from: format(startDate, 'yyyy-MM-dd'),
        to: format(endDate, 'yyyy-MM-dd'),
      },
    });

    return data;
  }

  const stockName = stock.name;

  const { data: historicalPrice, refetch } = useQuery(
    ['getHistoricalPrice', { stockName }],
    getHistoricalPriceFromStock,
    { enabled: !!stockName }
  );

  const categoriesChartHistoricalPrice: string[] = [];
  const dataChartHistoricalPrice: number[] = [];

  historicalPrice?.prices.forEach((history) => {
    dataChartHistoricalPrice.push(history.closing);
    categoriesChartHistoricalPrice.push(history.pricedAt);
  });

  return (
    <Container>
      <InfoStock>
        <h1 id="company-name">
          {stock.company} ({stock.name})
        </h1>
        {stock.lastPrice && (
          <span id="price">
            {stock.currency === 'USD'
              ? formatPriceUSD(stock.lastPrice)
              : formatPriceBRL(stock.lastPrice)}
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
            refetchData={refetch}
            label="INÍCIO EM:"
          />
          <DatePicker
            value={endDate}
            setValue={setEndDate}
            refetchData={refetch}
            label="TÉRMINO EM:"
          />
        </div>
        <Button
          type="button"
          label="ADICIONAR AO PORTFÓLIO"
          onClick={() => handleAddStockToPortfolio(stock)}
        />
      </Menu>
    </Container>
  );
}
