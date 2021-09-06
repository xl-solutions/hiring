import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type Props = TextInputProps;

function Input({ ...rest }: Props) {
  return <Container {...rest} selectionColor="#5F2EE2" />;
}

export { Input };
