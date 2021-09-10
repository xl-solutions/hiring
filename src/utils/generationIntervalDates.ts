import { eachDayOfInterval, format } from 'date-fns';
import { DayProps, MarkedDateProps } from '../components/Calendars/index';
import { getPlatformDate } from './getPlatformDate';

import { theme } from '../global/theme';

type Response = {
  interval: MarkedDateProps;
  dateFormattedList: string[];
};

export function generationInterval(start: DayProps, end: DayProps): Response {
  let interval: MarkedDateProps = {};
  let dateFormattedList: string[] = [];

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach(item => {
    const dateFormatted = format(getPlatformDate(item), 'yyyy-MM-dd');
    dateFormattedList.push(dateFormatted);

    interval = {
      ...interval,
      [dateFormatted]: {
        color:
          start.dateString === dateFormatted || end.dateString === dateFormatted
            ? theme.uiColors['info-default']
            : theme.uiColors['info-lighter'],
        textColor:
          start.dateString === dateFormatted || end.dateString === dateFormatted
            ? theme.uiColors['info-lighter']
            : theme.uiColors['info-default'],
      },
    };
  });

  return { interval, dateFormattedList };
}
