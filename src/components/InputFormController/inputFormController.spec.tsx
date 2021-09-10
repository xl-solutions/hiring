import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';

import { InputFormController } from './index';
import { RFValue } from 'react-native-responsive-fontsize';

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

    expect(inputFormControllerComponent.props.selectionColor).toEqual(
      'rgba(114, 114, 133, 1)',
    );
  });

  it('Should able to visible border to error', () => {
    const { getByTestId } = render(
      <InputFormController
        testID="inputFormController-error"
        iconName="search"
        isFocused={false}
        error="error-any"
        placeholder="Pesquisar ações, ETFs e outros para comprar"
        name="search"
      />,
      {
        wrapper: Providers,
      },
    );

    const inputFormControllerComponent = getByTestId(
      'inputFormController-error',
    );

    const fieldContainerComponent = getByTestId('test-fieldContainer');

    expect(inputFormControllerComponent.props.name).toEqual('search');

    expect(fieldContainerComponent.props.error).toEqual(true);

    expect(fieldContainerComponent.props.style[0].borderColor).toEqual(
      theme.uiColors['danger-default'],
    );

    expect(fieldContainerComponent.props.style[0].borderWidth).toEqual(
      RFValue(2),
    );
  });

  it('Should able to visible border to isFocused', () => {
    const { getByTestId } = render(
      <InputFormController
        testID="inputFormController-isFocused"
        iconName="search"
        isFocused={true}
        error={undefined}
        placeholder="Pesquisar ações, ETFs e outros para comprar"
        name="search"
      />,
      {
        wrapper: Providers,
      },
    );

    const inputFormControllerComponent = getByTestId(
      'inputFormController-isFocused',
    );

    const fieldContainerComponent = getByTestId('test-fieldContainer');

    expect(inputFormControllerComponent.props.name).toEqual('search');

    expect(fieldContainerComponent.props.error).toEqual(false);
    expect(fieldContainerComponent.props.isFocused).toEqual(true);

    expect(fieldContainerComponent.props.style[0].borderColor).toEqual(
      theme.uiColors['info-default'],
    );

    expect(fieldContainerComponent.props.style[0].backgroundColor).toEqual(
      theme.uiColors['info-lighter'],
    );

    expect(fieldContainerComponent.props.style[0].borderWidth).toEqual(
      RFValue(2),
    );
  });

  it('should able to visible Text Error', () => {
    const { getByTestId, toJSON } = render(
      <InputFormController
        testID="inputFormController-error-text"
        iconName="search"
        isFocused={false}
        error="error-any"
        placeholder="Pesquisar ações, ETFs e outros para comprar"
        name="search"
      />,
      {
        wrapper: Providers,
      },
    );

    const inputFormControllerComponent = getByTestId(
      'inputFormController-error-text',
    );

    const fieldContainerComponent = getByTestId('test-fieldContainer');
    const textErrorComponent = getByTestId('test-error');

    expect(inputFormControllerComponent.props).toHaveProperty('name');

    expect(textErrorComponent.props.children).toBe('error-any');

    expect(fieldContainerComponent.props.style[0].borderColor).toEqual(
      theme.uiColors['danger-default'],
    );

    expect(fieldContainerComponent.props.style[0].borderWidth).toEqual(
      RFValue(2),
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
