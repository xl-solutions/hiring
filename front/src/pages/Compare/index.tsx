import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { Container } from './styles';
import { IResponseCompare, useStocks } from '../../hooks/stocks';
import { ISeries, useChart } from '../../hooks/chart';
import Button from '../../components/Button';
import Input from '../../components/Input';
import 'react-day-picker/lib/style.css';

const Compare: React.FC = () => {
  const [compareStockName, setCompareStockName] = useState<string>('petr3.sa');
  const [stocks, setStocks] = useState<string[]>(['petr3.sa']);
  const { setSeries, setLoading } = useChart();
  const { getCompare: getCompareStock } = useStocks();
  const { stockName }: { stockName: string } = useParams();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCompareStockName(event.target.value);
    },
    [setCompareStockName],
  );

  const handleAdd = useCallback(() => {
    const unique = Array.from(new Set([...stocks, compareStockName]));
    setStocks(unique);
    setCompareStockName('');
  }, [stocks, compareStockName]);

  const handleKeyUpValue = useCallback(
    (event: any) => {
      setCompareStockName(event.target.value);
      if (event.key === 'Enter') {
        handleAdd();
      }
    },
    [handleAdd],
  );

  const series = useCallback(
    (compare: IResponseCompare): ISeries[] =>
      compare.lastPrices.map(
        (element): ISeries => ({
          name: element.name,
          type: 'column',
          data: [{ x: element.pricedAt.split('T')[0], y: element.lastPrice }],
        }),
      ),
    [],
  );

  const getCompare = useCallback(
    async (stocksParam: string[]) => {
      setLoading(true);

      const response: IResponseCompare | null = await getCompareStock({
        stockNameParam: stockName,
        stocks: stocksParam,
      }).catch(err => {
        if (err.response.status === 401) {
          setSeries(state => {
            const removeLastElment = state.pop();
            if (removeLastElment !== undefined) {
              return state;
            }
            return [];
          });
          setLoading(false);
        }
        throw new Error(err.message);
      });

      if (response) {
        return response;
      }
      return null;
    },
    [getCompareStock, setLoading, setSeries, stockName],
  );

  const set = useCallback(
    compare => {
      const seriesReceived = series(compare);
      setSeries(seriesReceived);
      setLoading(false);
    },
    [setLoading, setSeries, series],
  );

  useEffect(() => {
    getCompare(stocks)
      .then(compare => set(compare))
      .catch(() => false);
  }, [getCompare, set, stockName, stocks]);

  return (
    <Container>
      <Input
        icon={null}
        type="text"
        placeholder="Insere o nome da ação a ser comparada"
        value={compareStockName}
        onChange={handleChange}
        onKeyPress={handleKeyUpValue}
      />

      <Button onClick={handleAdd} type="submit">
        Adcionar
      </Button>
    </Container>
  );
};

export default Compare;
