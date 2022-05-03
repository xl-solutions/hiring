import { eachDayOfInterval, format } from 'date-fns';

import { IDateProvider } from '../IDateProvider';

class DateFnsProvider implements IDateProvider {
  getDatesInRange(start_date: Date, end_date: Date): string[] {
    const datesFormatted: string[] = [];

    const arrayDates = eachDayOfInterval({
      start: start_date,
      end: end_date,
    });

    arrayDates.forEach((date) => {
      datesFormatted.push(format(date, 'yyyy-MM-dd'));
    });

    return datesFormatted;
  }
}

export { DateFnsProvider };
