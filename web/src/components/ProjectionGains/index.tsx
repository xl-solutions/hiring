import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentStockProps } from '../../pages/Dashboard';
import api from '../../services/api';
import { IState } from '../../store';
import { IStock } from '../../store/modules/currentStock/types';
import { formatPriceBRL, formatPriceUSD } from '../../utils/formatPrice';
import { Button } from '../Button';
import { BarChart } from '../Charts/BarChart';
import { DatePicker } from '../DatePicker';
import { Container, InfoStock, Item, Menu } from './styles';

interface GainsByDateCurrentStockProps {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

export function ProjectionGains() {
  const stock = useSelector<IState, IStock>(
    (state) => state.currentStock.stock
  );
  const [gainsByDateFromCurrentStock, setGainsByDateFromCurrentStock] =
    useState<GainsByDateCurrentStockProps>();
  const [purchasedAmount, setPurchasedAmount] = useState<number>(10);
  const [purchasedDate, setPurchasedDate] = useState<MaterialUiPickersDate>(
    subDays(new Date(), 16)
  );
  const [isLoading, setIsLoading] = useState(false);

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

  const categoriesChartGainsByDate: string[] = [];
  const dataChartGainsByDate: number[] = [];

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

  return (
    <Container>
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
              stock.name,
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
            {gainsByDateFromCurrentStock?.priceAtDate ? (
              <span>
                {stock?.currency === 'BRL'
                  ? formatPriceBRL(gainsByDateFromCurrentStock?.priceAtDate)
                  : formatPriceUSD(gainsByDateFromCurrentStock?.priceAtDate)}
              </span>
            ) : (
              <span>00.00</span>
            )}
          </Item>
          <Item>
            <span>PREÇO MAIS RECENTE:</span>
            {gainsByDateFromCurrentStock?.lastPrice ? (
              <span>
                {stock?.currency === 'BRL'
                  ? formatPriceBRL(gainsByDateFromCurrentStock?.lastPrice)
                  : formatPriceUSD(gainsByDateFromCurrentStock?.lastPrice)}
              </span>
            ) : (
              <span>00.00</span>
            )}
          </Item>
          <hr />
        </div>
        <Item>
          <span>LUCRO/PREJUÍZO</span>
          {gainsByDateFromCurrentStock?.capitalGains ? (
            <span>
              {stock?.currency === 'BRL'
                ? formatPriceBRL(gainsByDateFromCurrentStock?.capitalGains)
                : formatPriceUSD(gainsByDateFromCurrentStock?.capitalGains)}
            </span>
          ) : (
            <span>00.00</span>
          )}
        </Item>
      </Menu>
    </Container>
  );
}
