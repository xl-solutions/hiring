import React from 'react';

import { Container } from './styled';

const AppContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AppContainer;
