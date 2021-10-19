import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Container, Calendar } from './styles';
import { IResponseGains, useStocks } from '../../hooks/stocks';
import { useChart } from '../../hooks/chart';
import Button from '../../components/Button';
import oneWeekBefore from '../../utils/oneWeekBefore';
import Input from '../../components/Input';

const Gains: React.FC = () => {
  const [purchasedAt, setPurchasedAt] = useState(oneWeekBefore(new Date()));
  const [purchasedAmount, setPurchasedAmount] = useState(50);

  const { getGains: getGainsStock } = useStocks();
  const { stockName }: { stockName: string } = useParams();
  const { setSeries, setLoading } = useChart();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPurchasedAmount(Number(event.target.value));
    },
    [setPurchasedAmount],
  );

  const series = useCallback(
    (gains: IResponseGains) => [
      {
        name: 'Último Lançamento',
        type: 'column',
        data: [
          {
            x: new Date(),
            y: gains.lastPrice,
          },
        ],
      },
      {
        name: 'Total de ganhos',
        type: 'column',
        data: [
          {
            x: new Date(),
            y: gains.capitalGains,
          },
        ],
      },
    ],

    [],
  );

  const set = useCallback(
    (gains: IResponseGains) => {
      setLoading(false);
      setSeries(series(gains));
    },
    [setLoading, setSeries, series],
  );

  const getGains = useCallback(async () => {
    setLoading(true);

    const response = await getGainsStock({
      stockNameParam: stockName,
      purchasedAmount,
      purchasedAt,
    });

    return response;
  }, [setLoading, getGainsStock, stockName, purchasedAmount, purchasedAt]);

  const handleAdd = useCallback(() => {
    getGains()
      .then(gains => {
        set(gains);
      })
      .catch(() => false);
  }, [getGains, set]);

  const handleKeyUpValue = useCallback(
    (event: any) => {
      setPurchasedAmount(Number(event.target.value));
      if (event.key === 'Enter') {
        handleAdd();
      }
    },
    [handleAdd],
  );

  const hanPlepurchasedAtDateChange = useCallback((day: Date) => {
    setPurchasedAt(day);
  }, []);

  useEffect(() => {
    getGains()
      .then(gains => set(gains))
      .catch(() => false);
  }, [stockName, purchasedAt, getGains, set]);

  return (
    <Container>
      <Input
        icon={null}
        className="input"
        type="number"
        value={purchasedAmount}
        onChange={handleChange}
        onKeyPress={handleKeyUpValue}
      />

      <Calendar>
        <DayPickerInput
          value={purchasedAt}
          dayPickerProps={{
            disabledDays: [{ daysOfWeek: [0, 6] }],
          }}
          onDayChange={hanPlepurchasedAtDateChange}
        />
      </Calendar>

      <Button type="submit" onClick={handleAdd}>
        Pesquisar
      </Button>
    </Container>
  );
};

export default Gains;
