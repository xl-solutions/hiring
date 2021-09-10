import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';

import { Dashboard } from './index';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from '../../routes/app.routes';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
);

const AppRoute: React.FC = () => (
  <Providers>
    <AppRoutes />
  </Providers>
);
const onPressMock = jest.fn(() => {
  return Promise.resolve({
    data: {
      bestMatches: [
        {
          '1. symbol': 'TSCO.LON',
          '2. name': 'Tesco PLC',
          '3. type': 'Equity',
          '4. region': 'United Kingdom',
          '5. marketOpen': '08:00',
          '6. marketClose': '16:30',
          '7. timezone': 'UTC+01',
          '8. currency': 'GBX',
          '9. matchScore': '0.7273',
        },
      ],
    },
  });
});

describe('Dashboard Screen', () => {
  afterEach(cleanup);

  it('shoup open keyboard input search text when user press input button', () => {
    const { getByTestId } = render(<Dashboard />, { wrapper: AppRoute });

    const searchComponent = getByTestId('test-input-search');

    expect(searchComponent.props.name).toBeTruthy();
    expect(searchComponent.props.name).toBeTruthy();
    expect(searchComponent.props.placeholder).toEqual(
      'Pesquisar ações, ETFs e outros para comprar',
    );

    fireEvent.press(searchComponent);
    fireEvent.changeText(searchComponent, 'IBM.DEX');

    // expect(searchComponent.props.value).toEqual('IBM.DEX');
    expect(searchComponent.props).toHaveProperty('onChangeText');
    // expect(onPressMock.mockImplementation).toHaveBeenCalled();
  });
});
