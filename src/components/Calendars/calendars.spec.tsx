import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../global/theme';

import { Calendars, MarkedDateProps, DayProps } from './index';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

let data: MarkedDateProps;
let mockFn = jest.fn();
let day: DayProps;
describe('Calendars Integration', () => {
  beforeEach(() => {
    data = {
      '2021-09-10': {
        color: '#3f4',
        textColor: '#3f9',
        disabled: undefined,
        disableTouchEvent: undefined,
        endingDay: undefined,
        startingDay: undefined,
      },
    };

    day = {
      dateString: new Date('2021-09-10').toDateString(),
      day: new Date('2021-09-10').getDay(),
      month: new Date('2021-09-10').getMonth(),
      timestamp: new Date('2021-09-10').getTime(),
      year: new Date('2021-09-10').getFullYear(),
    };
  });
  it('Should able to visible perfect', () => {
    const { getByTestId } = render(
      <Calendars
        onDayPress={() => mockFn(day)}
        markedDates={data}
        key="test-calendars"
      />,
      { wrapper: Providers },
    );

    // const calendarsComponent = getByTestId('test-calendars');
    // expect(mockFn).toBeCalledWith(day);
  });
});
