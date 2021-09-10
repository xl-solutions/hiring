import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';
import { RFValue } from 'react-native-responsive-fontsize';

import { Input } from './index';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

it('Should able to visible correctly perfection', () => {
  const { getByTestId } = render(
    <Input testID="input-test" placeholder="Buscar por" />,
    {
      wrapper: Providers,
    },
  );
  const inputComponent = getByTestId('input-test');

  expect(inputComponent.props.style[0].color).toEqual('#565666');
  expect(inputComponent.props.style[0].backgroundColor).toEqual('transparent');
  expect(inputComponent.props.style[0].fontFamily).toEqual(theme.fonts.Medium);
  expect(inputComponent.props.style[0].fontSize).toEqual(
    RFValue(theme.fontScale.xs),
  );
});
