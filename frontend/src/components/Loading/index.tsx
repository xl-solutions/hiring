import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <ReactLoading color="#6001d2" type="spin" />
    </Container>
  );
};

export default Loading;
