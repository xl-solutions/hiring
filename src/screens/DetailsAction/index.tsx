/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { parse } from 'date-fns';

import { useFetch } from '../../hooks/fetchData';

import { HeaderBase } from '../../components/HeaderBase';
import { StatusBarBase } from '../../components/StatusBarBase';
import { LoadButton } from '../../components/Loading/LoadButton';
import { ButtonLabel } from '../../components/ButtonLabel';

import { Container, ContainerCard, TitleText, Title } from './styles';
import { Alert } from 'react-native';

const { PORTFOLIO_ACTIONS } = process.env;

type DetailsActionProps = {
  [key in DetailsActionAttributions]: string;
};

type DetailsActionAttributions =
  | '01. symbol'
  | '02. open'
  | '03. high'
  | '04. low'
  | '05. price'
  | '06. volume'
  | '07. latest trading day'
  | '08. previous close'
  | '09. change'
  | '10. change percent';

function DetailsAction({ route }: any) {
  const { symbol } = route.params;
  const { statusBar, neutralColors } = useTheme();
  const {
    loadingGlobalQuote,
    detailsAction,
    loading,
    saveAsyncStorage,
    getAsyncStorage,
  } = useFetch();

  useEffect(() => {
    async function loadingRequest(): Promise<void> {
      if (!symbol) {
        return;
      }
      await loadingGlobalQuote(symbol);
    }

    loadingRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  async function handleAddPortfolio() {
    try {
      const listPortfolioExist = await getAsyncStorage(`${PORTFOLIO_ACTIONS}`);

      if (!listPortfolioExist) {
        await saveAsyncStorage(`${PORTFOLIO_ACTIONS}`, []);
        return;
      }

      const listFormatted: DetailsActionProps[] =
        JSON.parse(listPortfolioExist);

      const findActionExist = listFormatted.find(
        c => c['01. symbol'] === detailsAction['01. symbol'],
      );

      if (findActionExist) {
        return Alert.alert(
          'Atenção',
          'Está ação já faz parte de seu portfolio!',
        );
      }

      let newListPortfolio: DetailsActionProps[] = [
        ...listFormatted,
        detailsAction,
      ];

      await saveAsyncStorage(String(PORTFOLIO_ACTIONS), newListPortfolio);
      return Alert.alert('Portfolio', 'Ação adicionada ao Portfolio!');
    } catch (error) {
      return Alert.alert(
        'Falha',
        'Não foi possível adicionar o item ao portfolio!',
      );
    }
  }

  const formattedDate = useMemo(() => {
    const parseDate = parse(
      detailsAction['07. latest trading day'],
      'yyyy-MM-dd',
      new Date(),
    );
    const formatted = `${parseDate.getDay()}/${parseDate.getMonth()}`;
    return formatted;
  }, [detailsAction]);

  return (
    <>
      <StatusBarBase
        barStyle="dark-content"
        backgroundColor={statusBar.backgroundDefault}
        animated
        translucent={false}
      />
      <HeaderBase title={`Detalhes - ${symbol}`} />

      <Container>
        {loading ? (
          <LoadButton color={neutralColors.dark['dark-light']} size={20} />
        ) : (
          <>
            <Title>Informação cotação</Title>
            <ContainerCard>
              <TitleText>symbol: {detailsAction['01. symbol']}</TitleText>
              <TitleText>open: {detailsAction['02. open']}</TitleText>
              <TitleText>high: {detailsAction['03. high']}</TitleText>
              <TitleText>low: {detailsAction['04. low']}</TitleText>
              <TitleText>price: {detailsAction['05. price']}</TitleText>
              <TitleText>volume: {detailsAction['06. volume']}</TitleText>
              <TitleText>latest trading day: {formattedDate}</TitleText>
              <TitleText>
                close: {detailsAction['08. previous close']}
              </TitleText>
              <TitleText>change: {detailsAction['09. change']}</TitleText>
              <TitleText>
                change percent: {detailsAction['10. change percent']}
              </TitleText>
              <ButtonLabel
                style={{ marginTop: 20 }}
                onPress={handleAddPortfolio}>
                Adicionar ao perfil
              </ButtonLabel>
            </ContainerCard>
          </>
        )}
      </Container>
    </>
  );
}

export { DetailsAction };
