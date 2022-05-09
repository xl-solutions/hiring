import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Container, Content } from './styles';
import api from '../../services/api';
import { GeneralStockInfo } from '../../components/GeneralStockInfo';
import { ProjectionGains } from '../../components/ProjectionGains';
import { CompareStock } from '../../components/CompareStock';
import { updateCurrentStock } from '../../store/modules/currentStock/actions';
import { IState } from '../../store';
import { IStock } from '../../store/modules/currentStock/types';

export interface CurrentStockProps {
  name: string;
  lastPrice?: number;
  company?: string;
  region?: string;
  currency?: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const currentStock = useSelector<IState, IStock>(
    (state) => state.currentStock.stock
  );

  async function searchQuoteFromStock(
    stock_name: string,
    stock_company?: string,
    stock_region?: string,
    stock_currency?: string
  ) {
    const { data } = await api.get(`/${stock_name}/quote`);
    const stock = {
      name: stock_name,
      lastPrice: data.lastPrice,
      company: stock_company || currentStock.company,
      region: stock_region || currentStock.region,
      currency: stock_currency || currentStock.currency,
    };

    dispatch(updateCurrentStock(stock));
  }

  useEffect(() => {
    searchQuoteFromStock(currentStock.name);
  }, []);

  return (
    <Container>
      <Header withSearchBar fetchData={searchQuoteFromStock} />
      <Content>
        <GeneralStockInfo />
        <h2>Projeção de ganhos por compra</h2>
        <ProjectionGains />
        <h2>Comparar com outros ativos</h2>
        <CompareStock />
      </Content>
    </Container>
  );
}
