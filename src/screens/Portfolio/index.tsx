import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { HeaderBase } from '../../components/HeaderBase';
import { StatusBarBase } from '../../components/StatusBarBase';
import { useFetch } from '../../hooks/fetchData';

import { Container } from './styles';

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

function Portfolio() {
  const { getAsyncStorage, saveAsyncStorage } = useFetch();
  const { statusBar } = useTheme();

  const [listPortfolio, setListPortfolio] = useState<DetailsActionProps[]>([]);

  useEffect(() => {
    async function loadListAsyncStorage() {
      const listPortfolioExist = await getAsyncStorage(`${PORTFOLIO_ACTIONS}`);

      if (!listPortfolioExist) {
        await saveAsyncStorage(`${PORTFOLIO_ACTIONS}`, []);
        return;
      }

      const listFormatted: DetailsActionProps[] =
        JSON.parse(listPortfolioExist);

      setListPortfolio(listFormatted);
    }

    loadListAsyncStorage();
  }, [getAsyncStorage, saveAsyncStorage]);

  useEffect(() => console.log('listPortfolio', listPortfolio), [listPortfolio]);

  return (
    <>
      <StatusBarBase
        barStyle="dark-content"
        backgroundColor={statusBar.backgroundDefault}
        animated
        translucent={false}
      />
      <Container>
        <HeaderBase title="Portfólio" icon={false} avatar />
      </Container>
    </>
  );
}

export { Portfolio };
