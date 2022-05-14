import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button label="teste" />);

    expect(screen.getByText('teste')).toBeInTheDocument();
  });
});
