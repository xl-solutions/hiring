import { addDays } from 'date-fns';
import { Platform } from 'react-native';

const { OS } = Platform;

export function getPlatformDate(date: Date) {
  if (OS === 'android') {
    return addDays(date, 1);
  }

  return date;
}
