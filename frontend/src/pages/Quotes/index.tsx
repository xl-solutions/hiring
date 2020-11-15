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

import { usePortfolio, useQuoteData } from 'hooks/stocks';
import { addPortfolio, requestQuote } from 'store/actions/stocks';

import { Container, FormContainer, QuotesContainer } from './styled';

const schema = yup.object().shape({
  stockName: yup.string().required('Informe o nome da ação!'),
});

type QuoteForm = {
  stockName: string;
};

const QuotesPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, errors, setValue } = useForm<QuoteForm>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { handleSetPageName } = useMenu();

  const quoteData = useQuoteData();
  const portfolio = usePortfolio();

  React.useEffect(() => {
    handleSetPageName('Pesquisar');
  }, [handleSetPageName]);

  const onSubmit = React.useCallback(
    (values: QuoteForm) => {
      setLoading(true);

      function onSuccess() {
        setLoading(false);
      }

      function onFailure() {
        setLoading(false);
        toast.warning('Tente novamente');
      }

      dispatch(requestQuote(values.stockName, { onSuccess, onFailure }));

      setValue('stockName', '');
    },
    [dispatch, setValue]
  );

  const portfolioAlreadyExists = React.useCallback(
    () => portfolio?.find((item) => item.name === quoteData.name),
    [quoteData, portfolio]
  );

  const handleAddPortfolio = React.useCallback(() => {
    if (!portfolioAlreadyExists() && quoteData) {
      dispatch(addPortfolio(quoteData));
      toast.success('Adicionado ao portifólio');
    }
  }, [quoteData, dispatch, portfolioAlreadyExists]);

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
            {quoteData.name ? (
              <QuotesContainer>
                Nome:
                <h1>{quoteData?.name}</h1>
                Valor de fechamento (dólares):
                <h1>
                  {quoteData?.lastPrice?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </h1>
                Última data de fechamento:
                <h1>
                  {new Date(quoteData?.pricedAt).toLocaleDateString('pt-BR')}
                </h1>
                <Button
                  type="button"
                  icon={!portfolioAlreadyExists() ? FaSave : FaCheck}
                  onClick={handleAddPortfolio}
                >
                  {!portfolioAlreadyExists()
                    ? 'Adicionar ao Portifólio'
                    : 'Adicionado'}
                </Button>
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

export default QuotesPage;
