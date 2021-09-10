import React from 'react';

import { Container, Loading } from './styles';

type Props = {
  size?: number;
  color?: string;
  style?: object | undefined;
};

function LoadButton({ size, color, style }: Props) {
  return (
    <Container>
      <Loading size={size} color={color} style={style} />
    </Container>
  );
}

export { LoadButton };
