import React from 'react';
import Title from '../../components/Shared/Title/Title';
import Subtitle from '../../components/Shared/Subtitle/Subtitle';
import Button from '../../components/Shared/Button/Button';
import Container from '../../assets/styles/components/Container';
import ButtonContainer from '../../components/Home/ButtonContainer/ButtonContainer';
import HomeRoutes from '../Home/HomeRoutes';
import { NavLink, useRouteMatch } from 'react-router-dom';

const Home = () => {
  let match = useRouteMatch();
  const activeStyle = { color: '#fff', backgroundColor: '#444' };

  return (
    <Container>
      <Title>Bem vindo ao XL finanças</Title>
      <Subtitle>Selecione uma das opções abaixo para começar a usar</Subtitle>

      <ButtonContainer>
        <Button backgroundColor="#ddd">
          <NavLink
            activeStyle={activeStyle}
            to={`${match.path}/show-last-price`}
          >
            Preço atual
          </NavLink>
        </Button>
        <Button backgroundColor="#ddd">
          <NavLink
            activeStyle={activeStyle}
            to={`${match.path}/show-historical-price`}
          >
            Preço histórico
          </NavLink>
        </Button>
        <Button backgroundColor="#ddd">
          <NavLink
            activeStyle={activeStyle}
            to={`${match.path}/show-compare-stocks`}
          >
            Comparar ações
          </NavLink>
        </Button>
        <Button backgroundColor="#ddd">
          <NavLink
            activeStyle={activeStyle}
            to={`${match.path}/show-earnings-projection`}
          >
            Projeção de ganhos
          </NavLink>
        </Button>
      </ButtonContainer>

      <HomeRoutes />
    </Container>
  );
};

export default Home;
