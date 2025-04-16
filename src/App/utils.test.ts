import { calculatePreviousDays, calculateNextDays, getMonths, currentYear } from './utils';
import { Month } from './types';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months: Month[] = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
];

describe('utils.ts', () => {
  test('calculatePreviousDays returns correct days', () => {
    const currentMonth = months[1]; // February
    const previousMonth = months[0]; // January
    const result = calculatePreviousDays(28, currentMonth, previousMonth, 31, weekdays);
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBeLessThanOrEqual(6);
  });

  test('calculateNextDays returns correct days', () => {
    const currentMonth = months[1]; // February
    const result = calculateNextDays(28, currentMonth, weekdays);
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBeLessThanOrEqual(6);
  });

  test('getMonths returns correct month', () => {
    const result = getMonths(0, months);
    expect(result).toEqual({ name: 'January', days: 31 });
  });
});
