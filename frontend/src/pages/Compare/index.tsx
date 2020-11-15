import React from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa';

import { useMenu } from 'context/menu/MenuContext';

import Input from 'components/Input';
import Button from 'components/Button';
import ColumnChart from 'components/ColumnChart';
import CircularLoading from 'components/CircularLoading';

import { useCompareData } from 'hooks/stocks';
import { clearCompare, requestCompare } from 'store/actions/stocks';

import { Container, FormContainer, QuotesContainer } from './styled';

const schema = yup.object().shape({
  stockName: yup.string(),
});

type CompareForm = {
  stockName: string;
};

const ComparePage: React.FC = () => {
  const [stocks, setStocks] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, errors, setValue, watch } = useForm<
    CompareForm
  >({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { handleSetPageName } = useMenu();

  const compareData = useCompareData();

  React.useEffect(() => {
    handleSetPageName('Comparar');
  }, [handleSetPageName]);

  const handleAddStock = React.useCallback(() => {
    const stock = watch('stockName');
    if (stocks.find((item) => item === stock)) return;
    setStocks((prev) => [...prev, stock]);
    setValue('stockName', '');
  }, [setValue, watch, stocks]);

  const handleCompareClear = React.useCallback(() => {
    setStocks([]);
    dispatch(clearCompare());
  }, [dispatch]);

  const onSubmit = React.useCallback(
    (values: CompareForm) => {
      if (!values.stockName && stocks.length < 2) return;

      if (values.stockName) {
        return;
      }

      setLoading(true);

      function onSuccess() {
        setLoading(false);
      }

      function onFailure() {
        setLoading(false);
        toast.warning('Tente novamente');
      }

      const [stockName, ...otherStocks] = stocks;

      dispatch(
        requestCompare(
          { stockName, data: { stocks: otherStocks } },
          { onSuccess, onFailure }
        )
      );

      setStocks([]);

      setValue('stockName', '');
    },
    [dispatch, setValue, stocks]
  );

  const parseChartData = React.useCallback(
    () =>
      compareData?.lastPrices?.reduce((list: any, item) => {
        // eslint-disable-next-line no-param-reassign
        list = [...list, [item.name, item.lastPrice]];
        return list;
      }, []) || [],
    [compareData]
  );

  return (
    <Container>
      <div className="form-container-parent">
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              name="stockName"
              register={register}
              label="Informe o nome de uma ação"
              error={errors.stockName?.message}
            />
            <Button
              type="button"
              icon={FaPlus}
              variant="outlined"
              onClick={handleAddStock}
            >
              Adicionar
            </Button>
            <Button
              type="button"
              icon={FaTrash}
              variant="outlined"
              onClick={handleCompareClear}
            >
              Limpar
            </Button>
            <Button type="submit" icon={FaSearch}>
              Comparar Ações
            </Button>
          </div>
        </FormContainer>
      </div>
      <div className="history-container">
        {stocks.length > 0 && <h1>{`Comparar: ${stocks.join(', ')}`}</h1>}
        {loading ? (
          <CircularLoading />
        ) : (
          <QuotesContainer>
            <ColumnChart data={parseChartData()} />
          </QuotesContainer>
        )}
      </div>
    </Container>
  );
};

export default ComparePage;
