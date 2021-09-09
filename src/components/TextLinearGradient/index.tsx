/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { TextProps } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';

import { HeaderTitle } from './styles';

interface Props extends TextProps {
  children: string;
}

function TextLinearGradient(props: Props) {
  const { uiColors } = useTheme();
  const colorGradientPrimary = uiColors['success-default'];
  const colorGradientSecondary = uiColors['warning-default'];

  return (
    <MaskedView maskElement={<HeaderTitle {...props} />}>
      <LinearGradient
        locations={[0, 0.7]}
        colors={[colorGradientPrimary, colorGradientSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <HeaderTitle style={{ opacity: 0 }}>{props.children}</HeaderTitle>
      </LinearGradient>
    </MaskedView>
  );
}

export { TextLinearGradient };
