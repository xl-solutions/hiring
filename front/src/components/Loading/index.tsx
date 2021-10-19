import React from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styles';

const Loading: React.FC = () => (
  <Container>
    <ReactLoading color="#ff9000" height="10%" width="10%" />
  </Container>
);

export default Loading;
