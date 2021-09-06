import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

interface Props extends StatusBarProps {}
function StatusBarBase({ ...rest }: Props) {
  return <StatusBar {...rest} />;
}

export { StatusBarBase };
