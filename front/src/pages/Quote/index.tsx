import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useStocks } from '../../hooks/stocks';
import { IResponseQuote, useChart } from '../../hooks/chart';
import Button from '../../components/Button';
import 'react-day-picker/lib/style.css';
import { Container } from './styles';

const Quote: React.FC = () => {
  const { setSeries, setLoading } = useChart();
  const { getQuote: getQuoteStock } = useStocks();
  const { stockName }: { stockName: string } = useParams();

  const series = useCallback(
    (quote: IResponseQuote): any[] => [
      {
        name: quote.name,
        type: 'column',
        data: [{ x: quote.pricedAt, y: quote.lastPrice }],
      },
    ],
    [],
  );

  const getQuote = useCallback(async () => {
    setLoading(true);
    const response = await getQuoteStock({
      stockNameParam: stockName,
    });
    return response;
  }, [getQuoteStock, setLoading, stockName]);

  const set = useCallback(
    (quote: IResponseQuote) => {
      setLoading(false);
      setSeries(series(quote));
    },
    [series, setLoading, setSeries],
  );

  const handleClick = useCallback(() => {
    getQuote().then(quote => set(quote));
  }, [getQuote, set]);

  useEffect(() => {
    getQuote()
      .then(quote => set(quote))
      .catch(() => false);
  }, [getQuote, set, stockName]);

  return (
    <Container>
      <Button onClick={handleClick} type="submit">
        Pesquisar
      </Button>
    </Container>
  );
};

export default Quote;
