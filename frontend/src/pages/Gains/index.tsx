import React from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaCheck, FaSave, FaSearch } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMenu } from 'context/menu/MenuContext';

import Input from 'components/Input';
import Button from 'components/Button';
import CircularLoading from 'components/CircularLoading';

import { requestGains } from 'store/actions/stocks';
import { useProjection, useQuoteData } from 'hooks/stocks';

import { Container, FormContainer, QuotesContainer } from './styled';

const schema = yup.object().shape({
  stockName: yup.string().required(),
  purchasedAmount: yup.number().required(),
  purchasedAt: yup.string().required(),
});

type ProjectionForm = {
  stockName: string;
  purchasedAmount: number;
  purchasedAt: string;
};

const GainsPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, errors, setValue } = useForm<ProjectionForm>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { handleSetPageName } = useMenu();

  const projection = useProjection();

  const parseDate = React.useCallback((date: string): string => {
    return new Date(date).toISOString().split('T')[0];
  }, []);

  const onSubmit = React.useCallback(
    ({ stockName, purchasedAmount, purchasedAt }: ProjectionForm) => {
      setLoading(true);

      function onSuccess() {
        setLoading(false);
      }

      function onFailure() {
        setLoading(false);
        toast.warning('Tente novamente');
      }

      dispatch(
        requestGains(
          { purchasedAmount, stockName, purchasedAt: parseDate(purchasedAt) },
          { onSuccess, onFailure }
        )
      );

      setValue('stockName', '');
      setValue('purchasedAmount', '');
      setValue('purchasedAt', '');
    },
    [dispatch, setValue, parseDate]
  );

  React.useEffect(() => {
    handleSetPageName('Projeções');
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
              name="purchasedAmount"
              register={register}
              label="Quantidade de acões compradas"
              error={errors.purchasedAmount?.message}
            />
            <Input
              name="purchasedAt"
              type="date"
              register={register}
              label="Data da compra"
              error={errors.purchasedAt?.message}
            />

            <Button type="submit" icon={FaSearch}>
              Pesquisar
            </Button>
          </div>
        </FormContainer>
      </div>
      <div className="quotes-container">
        {loading ? (
          <CircularLoading />
        ) : (
          <>
            {projection.name ? (
              <QuotesContainer>
                Nome:
                <h1>{projection?.name}</h1>
                Valor do último fechamento (dólares):
                <h1>
                  {projection?.lastPrice?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h1>
                Valor na data da compra (dólares):
                <h1>
                  {projection?.priceAtDate?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h1>
                Data da compra:
                <h1>
                  {new Date(projection?.purchasedAt).toLocaleDateString(
                    'pt-BR'
                  )}
                </h1>
                Projeção (reais):
                <h1
                  className={projection.capitalGains > 0 ? 'success' : 'error'}
                >
                  {projection.capitalGains?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </h1>
                Acões compradas:
                <h1>{projection?.purchasedAmount}</h1>
              </QuotesContainer>
            ) : (
              <h1>Nenhum resultado :)</h1>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default GainsPage;
