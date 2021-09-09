/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import { useTheme } from 'styled-components/native';
import { format, parse } from 'date-fns';

import { useFetch } from '../../hooks/fetchData';
import {
  Calendars,
  MarkedDateProps,
  DayProps,
  generationInterval,
} from '../../components/Calendars';

import { HeaderBase } from '../../components/HeaderBase';
import { ModalLoadingSimple } from '../../components/Modals/ModalLoads/ModalLoadingSimple';
import { StatusBarBase } from '../../components/StatusBarBase';
import { ButtonLabel } from '../../components/ButtonLabel';

import {
  Container,
  ContainerCard,
  TitleText,
  Title,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Icon,
} from './styles';
import { getPlatformDate } from '../../utils/getPlatformDate';

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

interface IPeriodDate {
  start: string;
  end: string;
}
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

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );

  const [markedDates, setMarkedDate] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );

  const [periodDate, setPeriodDate] = useState<IPeriodDate>({} as IPeriodDate);

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

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generationInterval(start, end);
    setMarkedDate(interval);

    const startDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setPeriodDate({
      start: format(getPlatformDate(new Date(startDate)), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
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

      {loading ? (
        <ModalLoadingSimple />
      ) : (
        <>
          <Container>
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
                Adicionar no portfólio
              </ButtonLabel>
            </ContainerCard>

            <Title>Histórico</Title>

            <ContainerCard>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-around',
                  padding: 0,
                  marginBottom: 30,
                }}>
                <DateInfo>
                  <DateTitle>DE</DateTitle>
                  <DateValue>{periodDate.start || null}</DateValue>
                </DateInfo>
                <Icon
                  size={24}
                  color={neutralColors.dark['dark-default']}
                  name="arrow-right-l"
                />
                <DateInfo>
                  <DateTitle>ATÉ</DateTitle>
                  <DateValue>{periodDate.end || null}</DateValue>
                </DateInfo>
              </View>
              <Calendars
                markedDates={markedDates}
                onDayPress={handleChangeDate}
              />
            </ContainerCard>
          </Container>
          <Footer>
            <ButtonLabel style={{ marginTop: 20 }} onPress={() => {}}>
              Histórico de preços
            </ButtonLabel>
          </Footer>
        </>
      )}
    </>
  );
}

export { DetailsAction };
