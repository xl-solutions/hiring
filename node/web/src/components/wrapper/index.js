import React from 'react';

import { Container } from './styles';

export default function Wrapper({ children, padding }) {
  return (
    <Container padding={padding}>
      {children}
    </Container>
  );
}
