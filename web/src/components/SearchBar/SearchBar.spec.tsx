import { render, screen } from '@testing-library/react';
import { SearchBar } from '.';

describe('SearchBar component', () => {
  it('renders correctly', () => {
    render(
      <SearchBar
        fetchData={() => console.log('test')}
        placeholder="test search bar"
      />
    );

    expect(screen.findByPlaceholderText('test search bar'));
  });
});
