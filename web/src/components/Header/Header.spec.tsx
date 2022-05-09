import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Header } from '.';
import { store } from '../../store';

jest.mock('react-router-dom', () => ({
  Link: 'Link',
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
});
