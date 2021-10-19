import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Container, Calendar } from './styles';
import { IResponseHistory, useStocks } from '../../hooks/stocks';
import oneDayAfter from '../../utils/oneDayAfter';
import { useChart } from '../../hooks/chart';
import Button from '../../components/Button';
import oneWeekBefore from '../../utils/oneWeekBefore';
import 'react-day-picker/lib/style.css';

const History: React.FC = () => {
  const [from, setFrom] = useState(oneWeekBefore(new Date()));
  const [to, setTo] = useState(new Date());

  const { getHistory: getHistoryStock } = useStocks();
  const { stockName }: { stockName: string } = useParams();
  const { setSeries, setLoading } = useChart();

  const getHistory = useCallback(async () => {
    setLoading(true);

    const response = await getHistoryStock({
      stockNameParam: stockName,
      to,
      from,
    });

    return response;
  }, [setLoading, getHistoryStock, stockName, to, from]);

  const series = useCallback(
    (history: IResponseHistory) => [
      {
        name: history.name,
        data: history.prices.map(element => ({
          x: element.pricedAt,
          y: element.closing,
        })),
      },
    ],

    [],
  );

  const set = useCallback(
    (history: IResponseHistory) => {
      setLoading(false);
      setSeries(series(history));
    },
    [setLoading, setSeries, series],
  );

  const handleToDateChange = useCallback((day: Date) => {
    setTo(day);
  }, []);

  const handleFromDateChange = useCallback((day: Date) => {
    setFrom(day);
  }, []);

  const handleClick = useCallback(() => {
    getHistory()
      .then(history => set(history))
      .catch(() => false);
  }, [getHistory, set]);

  useEffect(() => {
    getHistory()
      .then(history => set(history))
      .catch(() => false);
  }, [getHistory, set, stockName, to]);

  return (
    <Container>
      <Button type="submit" onClick={handleClick}>
        Submit
      </Button>

      <Calendar>
        <DayPickerInput
          value={from}
          dayPickerProps={{
            disabledDays: [{ daysOfWeek: [0, 6] }],
          }}
          onDayChange={handleFromDateChange}
        />

        <DayPickerInput
          value={to}
          dayPickerProps={{
            disabledDays: [
              {
                before: oneDayAfter(new Date(from)),
              },
              { daysOfWeek: [0, 6] },
            ],
            selectedDays: to,
            weekdaysShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            months: [
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ],
          }}
          onDayChange={handleToDateChange}
        />
      </Calendar>
    </Container>
  );
};

export default History;
