import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, TitleButton } from './styles';

interface Props extends RectButtonProps {
  children: string;
}

function ButtonLabel({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      <TitleButton>{children}</TitleButton>
    </Container>
  );
}

export { ButtonLabel };
