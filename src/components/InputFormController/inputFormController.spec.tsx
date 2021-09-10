import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';
import { RFValue } from 'react-native-responsive-fontsize';

import { InputFormController } from './index';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Check component integrity InputFormController', () => {
  it('Should able to visible correctly perfection', () => {
    const { getByTestId } = render(
      <InputFormController
        testID="inputFormController-visible-perfection"
        iconName="search"
        isFocused={false}
        error={undefined}
        placeholder="Pesquisar ações, ETFs e outros para comprar"
        name="search"
      />,
      {
        wrapper: Providers,
      },
    );

    const inputFormControllerComponent = getByTestId(
      'inputFormController-visible-perfection',
    );

    expect(inputFormControllerComponent.props.style[0].backgroundColor).toEqual(
      'transparent',
    );

    expect(inputFormControllerComponent.props.placeholder).toEqual(
      'Pesquisar ações, ETFs e outros para comprar',
    );
  });

  it('Should able to visible border to error', () => {
    const { getByTestId, debug } = render(
      <InputFormController
        testID="inputFormController-error"
        iconName="search"
        isFocused={false}
        error="Error"
        placeholder="Pesquisar ações, ETFs e outros para comprar"
        name="search"
      />,
      {
        wrapper: Providers,
      },
    );

    // debug();
    // const inputFormControllerComponent = getByTestId(
    //   'inputFormController-error',
    // );

    // expect(inputFormControllerComponent.props.error).toEqual('Error');

    // expect(inputFormControllerComponent.props.style[0].borderColor).toEqual(
    //   theme.uiColors['info-default'],
    // );
  });
});
