import React from 'react';
import { useParams } from 'react-router-dom';

import { Container } from './styles';

import Header from '../../components/Header';

interface RouteParams {
  stock_name: string;
}

const Projection: React.FC = () => {
  const { stock_name } = useParams() as RouteParams;

  return (
    <>
      <Header />
      <Container>
        <h1>Projeção</h1>
      </Container>
    </>
  );
};

export default Projection;
