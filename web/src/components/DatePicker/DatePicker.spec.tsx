import { render, screen } from '@testing-library/react';
import { DatePicker } from '.';

describe('DatePicker component', () => {
  it('renders correctly', () => {
    const testDate = '2022-05-09T00:00:000Z';
    render(
      <DatePicker
        label="test date picker"
        value={testDate}
        setValue={() => console.log('Change value datepicker')}
      />
    );

    expect(screen.findByLabelText('test date picker'));
  });
});
