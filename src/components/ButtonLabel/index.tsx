import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, TitleButton } from './styles';

interface Props extends RectButtonProps {
  children: string;
  color?: boolean;
}

function ButtonLabel({ children, color = false, ...rest }: Props) {
  return (
    <Container color={color} {...rest}>
      <TitleButton>{children}</TitleButton>
    </Container>
  );
}

export { ButtonLabel };
