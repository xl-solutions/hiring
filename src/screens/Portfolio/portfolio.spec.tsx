import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';
import { AppRoutes } from '../../routes/app.routes';

import { Portfolio } from './index';

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

describe('Portfolio Screen', () => {
  afterEach(cleanup);

  it('Should able to visible Header Portfólio', async () => {
    const { findByText } = render(<Portfolio />, {
      wrapper: AppRoute,
    });

    // debug();
    const headerBaseComponent = await findByText('Portfólio');

    expect(headerBaseComponent).toBeTruthy();
    expect(headerBaseComponent.props.style[0].backgroundColor).toEqual(
      'transparent',
    );
    expect(headerBaseComponent.props.children).toBe('Portfólio');
    expect(headerBaseComponent.props.numberOfLines).toEqual(1);
  });

  it('Should able to visible List', async () => {
    const { findByText } = render(<Portfolio />, {
      wrapper: AppRoute,
    });

    const statusBarComponent = await findByText('test-TitleText');

    expect(statusBarComponent).toBeTruthy();
    // expect(statusBarComponent.props.style[0].backgroundColor).toEqual(
    //   theme.statusBar.backgroundDefault,
    // );
    // expect(statusBarComponent.props.translucent).toBe(false);
    // expect(statusBarComponent.props).toHaveProperty('animated');
  });
});
