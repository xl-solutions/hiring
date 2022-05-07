import { render } from '@testing-library/react';
import { Header } from '.';

jest.mock('react-router-dom', () => ({
  Link: 'Link',
  Route: ({ children, path }) => children({ match: path === '/' }),
}));

describe('Header component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header />);

    expect(getByText('dashmoney')).toBeInTheDocument();
  });
});
