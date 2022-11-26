export enum ValidatationTypes {
  STRING = 'string',

  NUMBER = 'number',
  POSITIVE_NUMBER = 'number_positive',

  DATE = 'date',
  IS_NOT_WEEKEND = 'weekend',
  DATE_INTERVAL = 'date_interval',
  NOT_TODAY_OR_AFTER = 'today_or_after',
}

export namespace Validators {
  export function isNotEmpty(value: string) {
    //undefined, null, "" ou "   "
    if (value) return Boolean(value.trim());
    return false;
  }

  export function isValidDate(value: string) {
    if (isNotEmpty(value)) {
      return 'Invalid Date' !== new Date(value).toString();
    }
    return false;
  }

  export function isNotWeekend(value: string) {
    if (isValidDate(value)) {
      const dateDay = new Date(value);
      const isSunday = dateDay.getUTCDay() === 0;
      const isSaturday = dateDay.getUTCDay() === 6;
      if (!isSunday && !isSaturday) {
        return true;
      }
    }
    return false;
  }

  export function isValidDateInterval(dates: string[]) {
    const [beginDate, endingDate] = dates;
    if (isValidDate(beginDate) && isValidDate(endingDate)) {
      //getting only the 2022-01-01 part.
      const beginDateObj = new Date(new Date(beginDate).toISOString().split('T')[0]);
      const endingDateObj = new Date(new Date(endingDate).toISOString().split('T')[0]);

      const endingIsAfterBeginning = endingDateObj.valueOf() >= beginDateObj.valueOf();
      if (endingIsAfterBeginning) {
        return true;
      }
    }
    return false;
  }

  export function dateIsNotTodayOrAfter(date: string) {
    if (isValidDate(date)) {
      //getting only the 2022-01-01 part.
      const dateObj = new Date(new Date(date).toISOString().split('T')[0]);

      const today = new Date(new Date().toISOString().split('T')[0]);
      const isNotTodayOrAfter = today.valueOf() - dateObj.valueOf() >= 86400000;
      if (isNotTodayOrAfter) {
        return true;
      }
    }
    return false;
  }

  export function isNumber(number: string) {
    return !isNaN(Number(number));
  }

  export function isPositiveNumber(number: string) {
    if (isNumber(number)) return Number(number) > 0;
    return false;
  }
}
