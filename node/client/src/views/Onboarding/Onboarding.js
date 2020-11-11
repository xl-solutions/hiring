import React from 'react';
import Title from '../../components/Shared/Title/Title';
import Subtitle from '../../components/Shared/Subtitle/Subtitle';
import Container from '../../assets/styles/components/Container';
import Button from '../../components/Shared/Button/Button';
import Centralize from '../../components/Shared/Centralize/Centralize';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <Container>
      <Title>Bem vindo ao XL finanças</Title>
      <Subtitle>Clique abaixo para continuar</Subtitle>
      <Centralize>
        <Button color="#FFF" backgroundColor="blue">
          <Link to="/home">Começar agora</Link>
        </Button>
      </Centralize>
    </Container>
  );
};

export default Onboarding;
