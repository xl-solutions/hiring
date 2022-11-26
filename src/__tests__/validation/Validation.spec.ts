import { Validators } from '../../utils/validations/Validators';

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

  test('PositiveNumber - should return true if value is a positive number', () => {
    expect(Validators.isPositiveNumber('2')).toBe(true);
    expect(Validators.isPositiveNumber('22.22')).toBe(true);
    expect(Validators.isPositiveNumber('     22 ')).toBe(true);
  });

  test('PositiveNumber - should return false if value is a negative number', () => {
    expect(Validators.isPositiveNumber('-22.22')).toBe(false);
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
    expect(Validators.isValidDate('50-1--2')).toBe(false);
  });

  test('IsNotWeekend - should return true if value is not a weekend', () => {
    expect(Validators.isNotWeekend('2022-11-11')).toBe(true);
    expect(Validators.isNotWeekend('2022-10-10')).toBe(true);
    expect(Validators.isNotWeekend('2022-09-09')).toBe(true);
  });
  test('IsNotWeekend - should return false if value is a weekend', () => {
    expect(Validators.isNotWeekend('2022-11-12')).toBe(false);
    expect(Validators.isNotWeekend('2022-11-13')).toBe(false);
  });

  test('DateInterval - should return true if value is a valid date interval', () => {
    expect(Validators.isValidDateInterval(['2022-11-11', '2022-11-14'])).toBe(true);
    expect(Validators.isValidDateInterval(['2022-11-11', '2022-11-11'])).toBe(true);
  });

  test('DateInterval - should return false if value is not a valid date interval', () => {
    expect(Validators.isValidDateInterval(['2022-11-13', '2022-11-12'])).toBe(false);
  });

  test('TodayOrAfter - should return true if date is not today or after', () => {
    const day = 86400000;
    const yesterday = new Date(Date.now() - day).toISOString().split('T')[0];

    expect(Validators.dateIsNotTodayOrAfter(yesterday)).toBe(true);
    expect(Validators.dateIsNotTodayOrAfter('2000-11-12')).toBe(true);
    expect(Validators.dateIsNotTodayOrAfter('2000-05-22')).toBe(true);
  });

  test('TodayOrAfter - should return false if date is today or after', () => {
    const today = new Date().toISOString().split('T')[0];
    const day = 86400000;
    const tomorrow = new Date(Date.now() + day).toISOString().split('T')[0];

    expect(Validators.dateIsNotTodayOrAfter(today)).toBe(false);
    expect(Validators.dateIsNotTodayOrAfter(tomorrow)).toBe(false);
    expect(Validators.dateIsNotTodayOrAfter('9999-11-27')).toBe(false);
  });
});
