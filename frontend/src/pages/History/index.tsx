import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startOfMonth, endOfMonth, formatISO, parseISO } from 'date-fns';
import { FiEdit } from 'react-icons/fi';
import DatePicker from 'react-datepicker';

import { Container, InputContainer, TableContainer } from './styles';

import Header from '../../components/Header';
import api from '../../services/api';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

interface RouteParams {
  stock_name: string;
}

interface Price {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

interface StockHistory {
  name: string;
  prices: Price[];
}

const History: React.FC = () => {
  const { stock_name } = useParams() as RouteParams;

  const [stockHistory, setStockHistory] = useState<StockHistory>(
    {} as StockHistory,
  );

  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(startOfMonth(new Date()));
  const [to, setTo] = useState(endOfMonth(new Date()));

  useEffect(() => {
    async function loadStockHistory(): Promise<void> {
      try {
        setLoading(true);

        const { data } = await api.get(`/stocks/${stock_name}/history`, {
          params: {
            from: formatISO(from),
            to: formatISO(to),
          },
        });

        setStockHistory(data);
      } catch (err) {
        alert('Ops, não foi possivel carregar o histórico');
      } finally {
        setLoading(false);
      }
    }

    loadStockHistory();
  }, [stock_name, from, to]);

  return (
    <>
      <Header>
        <button type="button">Voltar</button>
      </Header>
      <Container>
        <InputContainer>
          <DatePicker
            onChange={date => {
              if (date) {
                setFrom(date);
              }
            }}
            selected={from}
            dateFormat="dd/MM/yyyy"
          />

          <DatePicker
            onChange={date => {
              if (date) {
                setTo(date);
              }
            }}
            selected={to}
            dateFormat="dd/MM/yyyy"
          />

          <button type="button">
            <FiEdit />
            Alterar
          </button>
        </InputContainer>
        <TableContainer>
          <strong>{stock_name}</strong>

          <table>
            <thead>
              <tr>
                <th>Opening</th>
                <th>Low</th>
                <th>High</th>
                <th>Closing</th>
                <th>Atualizado em</th>
              </tr>
            </thead>
            <tbody>
              {stockHistory.prices &&
                stockHistory.prices.map((price, index) => (
                  <tr key={index}>
                    <td>{formatValue(price.opening)}</td>
                    <td>{formatValue(price.low)}</td>
                    <td>{formatValue(price.high)}</td>
                    <td>{formatValue(price.closing)}</td>
                    <td>{formatDate(parseISO(price.pricedAt))}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default History;
