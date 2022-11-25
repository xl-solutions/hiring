//     DATE = 'date',
//   STRING = 'string',
//   NUMBER = 'number',
//   POSITIVE_NUMBER = 'number_positive',
//   IS_NOT_HOLIDAY = 'holiday',
//   DATE_INTERVAL = 'date_interval',
//   NOT_TODAY_OR_AFTER = 'today_or_after',

import { Validators } from '../utils/validations/Validators';

describe('Validators', () => {
  test('EmptyString - should return true if value is a valid string', () => {
    expect(Validators.isNotEmpty('valid')).toBe(true);
    expect(Validators.isNotEmpty('2')).toBe(true);
    expect(Validators.isNotEmpty('   valid   ')).toBe(true);
  });
  test('EmptyString - should return false if value is a emptyish string', () => {
    expect(Validators.isNotEmpty('      ')).toBe(false);
    expect(Validators.isNotEmpty('')).toBe(false);
  });

  test('Number - should return true if value is a valid number', () => {
    expect(Validators.isNumber('2')).toBe(true);
    expect(Validators.isNumber('22.22')).toBe(true);
    expect(Validators.isNumber('-22.22')).toBe(true);
    expect(Validators.isNumber('     22 ')).toBe(true);
  });

  test('Number - should return false if value is NaN', () => {
    expect(Validators.isNumber('22,22')).toBe(false);
    expect(Validators.isNumber('validNumber')).toBe(false);
  });

  test('Date - should return true if value is a valid date', () => {
    expect(Validators.isValidDate('2022-01-02')).toBe(true);
    expect(Validators.isValidDate(new Date().toISOString())).toBe(true);
    expect(Validators.isValidDate('2')).toBe(true); // dont ask me, this is a valid date.
  });

  test('Date - should return false if its not a valid date', () => {
    expect(Validators.isValidDate('22,22')).toBe(false);
    expect(Validators.isValidDate('validDate')).toBe(false);
    expect(Validators.isValidDate('2022-02-32')).toBe(false);
    expect(Validators.isValidDate('2022-01-00')).toBe(false);
    expect(Validators.isValidDate('2022-1-2')).toBe(false);
  });
});
