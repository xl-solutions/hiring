/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { subYears } from 'date-fns';
import {
  Calendar as CustomerCalendar,
  LocaleConfig,
  DateCallbackHandler,
} from 'react-native-calendars';

import { generationInterval } from '../../utils/generationIntervalDates';
import { ptBr } from '../../utils/languages';

LocaleConfig.locales['pt-br'] = ptBr;

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
    endingDay?: boolean;
    startingDay?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendars({ markedDates, onDayPress }: CalendarProps) {
  const { neutralColors, fontScale, fonts, screen } = useTheme();

  return (
    <CustomerCalendar
      renderArrow={direction => (
        <Feather
          size={24}
          color={neutralColors.dark['dark-default']}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: screen.background,
        borderBottomWidth: 0.5,
        borderBottomColor: neutralColors.light['light-default'],
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: fonts.Regular,
        textDayHeaderFontFamily: fonts.Regular,
        textDayHeaderFontSize: fontScale.xxxs,
        textMonthFontFamily: fonts.SemiBold,
        textMonthFontSize: fontScale.sm,
        monthTextColor: neutralColors.dark['dark-default'],
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={subYears(new Date(), 1)}
      maxDate={new Date()}
      markedDates={markedDates}
      onDayPress={onDayPress}
      markingType={'period'}
    />
  );
}

export { Calendars, DayProps, MarkedDateProps, generationInterval };
