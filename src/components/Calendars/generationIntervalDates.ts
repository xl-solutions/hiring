import { eachDayOfInterval, format } from 'date-fns';
import { DayProps, MarkedDateProps } from './index';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { theme } from '../../global/theme';

export function generationInterval(
  start: DayProps,
  end: DayProps,
): MarkedDateProps {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach(item => {
    const dateFormatted = format(getPlatformDate(item), 'yyyy-MM-dd');

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

  console.log('interval', interval);
  return interval;
}
