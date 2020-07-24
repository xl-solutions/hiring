import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FiActivity, FiShoppingCart } from 'react-icons/fi';
import { isBefore, startOfMonth, formatISO } from 'date-fns';
import formatValue from '../../utils/formatValue';

import { Container, InputContainer, CardContainer } from './styles';

import Header from '../../components/Header';
import api from '../../services/api';
import Loading from '../../components/Loading';

interface RouteParams {
  stock_name: string;
}

interface Projection {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

const Projection: React.FC = () => {
  const { stock_name } = useParams() as RouteParams;

  const [loading, setLoading] = useState(false);
  const [purchasedAt, setPurchasedAt] = useState(startOfMonth(new Date()));
  const [purchasedAmount, setPurchasedAmount] = useState(1);

  const [projection, setProjection] = useState<Projection | null>(null);

  const loadProjectionData = useCallback(
    async (amount, date) => {
      try {
        setLoading(true);

        const { data } = await api.get<Projection>(
          `/stocks/${stock_name}/gains`,
          {
            params: {
              purchasedAmount: amount,
              purchasedAt: formatISO(date, {
                representation: 'date',
              }),
            },
          },
        );

        setProjection(data);
      } catch (err) {
        alert('Ops, aconteceu algum erro ao calcular projeção');
        setProjection(null);
      } finally {
        setLoading(false);
      }
    },
    [stock_name],
  );

  useEffect(() => {
    loadProjectionData(1, startOfMonth(new Date()));
  }, [loadProjectionData]);

  const handleCalculateProjection = useCallback(() => {
    loadProjectionData(purchasedAmount, purchasedAt);
  }, [loadProjectionData, purchasedAmount, purchasedAt]);

  return (
    <>
      <Header subtitle="Projeção" />
      <Container>
        <strong>{stock_name}</strong>

        <InputContainer>
          <DatePicker
            onChange={date => {
              if (date) {
                if (!isBefore(date, new Date())) {
                  alert('Data inválida inválido');
                  return;
                }

                setPurchasedAt(date);
              }
            }}
            selected={purchasedAt}
            dateFormat="dd/MM/yyyy"
          />

          <input
            type="number"
            placeholder="Quantidade"
            value={purchasedAmount}
            onChange={e => setPurchasedAmount(Number(e.target.value))}
          />

          <button
            type="button"
            onClick={handleCalculateProjection}
            disabled={loading}
          >
            <FiActivity />
            Calcular
          </button>
        </InputContainer>

        {loading && <Loading />}

        {!loading && projection && (
          <CardContainer>
            <div>
              <strong>Preço na compra</strong>
              <span
                className={
                  projection.priceAtDate < projection.lastPrice
                    ? 'negative'
                    : 'positive'
                }
              >
                {formatValue(projection.priceAtDate)}
              </span>
            </div>

            <div>
              <strong>Preço atual</strong>
              <span
                className={
                  projection.lastPrice < projection.priceAtDate
                    ? 'negative'
                    : 'positive'
                }
              >
                {formatValue(projection.lastPrice)}
              </span>
            </div>

            <div>
              <strong>Ganhos</strong>
              <span
                className={
                  projection.capitalGains > 0
                    ? 'positive gains'
                    : 'negative gains'
                }
              >
                {formatValue(projection.capitalGains)}
              </span>
            </div>

            <FiShoppingCart />
          </CardContainer>
        )}
      </Container>
    </>
  );
};

export default Projection;
