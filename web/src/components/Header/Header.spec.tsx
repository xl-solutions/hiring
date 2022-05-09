import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Header } from '.';
import { store } from '../../store';

jest.mock('react-router-dom', () => ({
  Link: 'a',
  Route: ({ children, path }) => children({ match: path === '/' }),
}));

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('dashmoney')).toBeInTheDocument();
  });

  it('renders correctly with input search', () => {
    render(
      <Provider store={store}>
        <Header withSearchBar />
      </Provider>
    );

    expect(screen.findByTestId('search-bar')).toBeTruthy();
  });
});
