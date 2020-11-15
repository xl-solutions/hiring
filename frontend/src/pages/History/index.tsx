/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMenu } from 'context/menu/MenuContext';

import Input from 'components/Input';
import Button from 'components/Button';
import AreaChart from 'components/AreaChart';
import CircularLoading from 'components/CircularLoading';

import { useHistoryData } from 'hooks/stocks';
import { requestHistory } from 'store/actions/stocks';

import { Container, FormContainer, AreaChartContainer } from './styled';

const schema = yup.object().shape({
  stockName: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});

type HistoryForm = {
  stockName: string;
  from: string;
  to: string;
};

const HistoryPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, errors, setValue } = useForm<HistoryForm>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { handleSetPageName } = useMenu();

  const historyData = useHistoryData();

  const parseDate = React.useCallback((date: string): string => {
    return new Date(date).toISOString().split('T')[0];
  }, []);

  const onSubmit = React.useCallback(
    ({ stockName, from, to }: HistoryForm) => {
      setLoading(true);

      function onSuccess() {
        setLoading(false);
      }

      function onFailure() {
        setLoading(false);
        toast.warning('Tente novamente');
      }

      const data = {
        stockName,
        from: parseDate(from as string),
        to: parseDate(to as string),
      };

      dispatch(requestHistory(data, { onFailure, onSuccess }));
      setValue('stockName', '');
      setValue('from', '');
      setValue('to', '');
    },
    [dispatch, setValue, parseDate]
  );

  const parseHistoryData = React.useCallback(
    () =>
      historyData?.prices?.reduce((objects: any, item) => {
        const parsedDate = parseDate(item.pricedAt);
        objects = {
          ...objects,
          [parsedDate]: item.closing,
        };
        return objects;
      }, {}) || [],
    [historyData, parseDate]
  );

  React.useEffect(() => {
    handleSetPageName('Histórico');
  }, [handleSetPageName]);

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
            <Input
              name="from"
              register={register}
              label="Data inicial"
              type="date"
              error={errors.from?.message}
            />
            <Input
              name="to"
              register={register}
              label="Data final"
              type="date"
              error={errors.to?.message}
            />
            <Button type="submit" icon={FaSearch}>
              Pesquisar
            </Button>
          </div>
        </FormContainer>
      </div>
      <div className="chart-container">
        {loading ? (
          <CircularLoading />
        ) : (
          <>
            {historyData?.name && (
              <h1>{`Histórico de variações: ${historyData.name.toUpperCase()}`}</h1>
            )}
            <AreaChartContainer>
              <AreaChart data={parseHistoryData()} />
            </AreaChartContainer>
          </>
        )}
      </div>
    </Container>
  );
};

export default HistoryPage;
