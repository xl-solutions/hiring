import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';

import { ButtonLabel } from './index';
import { RFValue } from 'react-native-responsive-fontsize';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ButtonLabel Visible or Function', () => {
  it('Should able to visible correctly perfection', () => {
    const { getByTestId } = render(
      <ButtonLabel children="buscar" testID="test-ButtonLabel" color={true} />,
      { wrapper: Providers },
    );

    const buttonLabelComponent = getByTestId('test-ButtonLabel');

    expect(buttonLabelComponent).toBeTruthy();
    expect(buttonLabelComponent.props.style.borderRadius).toEqual(
      RFValue(theme.card.borderRadius),
    );
    expect(buttonLabelComponent.props.style.height).toEqual(RFValue(48));
    expect(buttonLabelComponent.props.style.width).toEqual('100%');
    expect(buttonLabelComponent.props.style.alignItems).toEqual('center');
    expect(buttonLabelComponent.props.style.justifyContent).toEqual('center');
    expect(buttonLabelComponent.props.style.backgroundColor).toEqual(
      theme.uiColors['success-default'],
    );
  });

  it('Should able to Children Text name', () => {
    const { getByTestId } = render(
      <ButtonLabel children="buscar" testID="test-ButtonLabel" color={true} />,
      { wrapper: Providers },
    );

    // const buttonLabelComponent = getByTestId('test-ButtonLabel');
    const titleButton = getByTestId('test-TitleButton');

    expect(titleButton.props.children).toBeTruthy();
    expect(titleButton.props.children).toBe('buscar');
    expect(titleButton.props.style[0].fontFamily).toEqual(theme.fonts.SemiBold);
    expect(titleButton.props.style[0].fontWeight).toEqual('600');
    expect(titleButton.props.style[0].textAlign).toEqual('center');
    expect(titleButton.props.style[0].color).toEqual(
      theme.neutralColors.light['light-light'],
    );
  });

  it('Should able to Press in Button', async () => {
    const { getByTestId, queryByTestId, toJSON } = render(
      <ButtonLabel
        children="execute-function"
        testID="test-ButtonLabel"
        color={true}
        onPress={() => {
          setTimeout(() => {}, 2000);
        }}
      />,
      { wrapper: Providers },
    );

    const buttonLabelComponent = getByTestId('test-ButtonLabel');
    fireEvent.press(buttonLabelComponent);

    await waitFor(() => expect(queryByTestId('test-TitleButton')).toBeTruthy());

    expect(getByTestId('test-TitleButton').props.children).toBe(
      'execute-function',
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
