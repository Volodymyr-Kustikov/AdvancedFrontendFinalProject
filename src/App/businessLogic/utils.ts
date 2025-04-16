import { Month, DayInfo } from './types';
import monthsData from '../months.json';

export const arrOfLastIndexes: number[] = [];
export const currentYear = new Date().getFullYear();

const months: Month[] = monthsData;

export function calculatePreviousDays(
  monthDays: number, 
  currentMonth: Month, 
  previousMonth: Month, 
  previousMonthDays: number,
  weekdays: string[]
): number[] {
  const currentMonthIndex = months.findIndex(m => m.name === currentMonth.name);
  
  const firstDayOfCurrentMonth = new Date(currentYear, currentMonthIndex, 1);
  const firstDayOfWeek = firstDayOfCurrentMonth.toLocaleString('en-US', { weekday: 'long' });
  const firstDayIndex = weekdays.indexOf(firstDayOfWeek);

  const previousMonthDaysToAdd = firstDayIndex;
  
  const addedDays = [...Array(previousMonthDays + 1).keys()]
    .splice(previousMonthDays - previousMonthDaysToAdd, previousMonthDaysToAdd);

  return addedDays;
}

export function calculateNextDays(
  monthDays: number, 
  currentMonth: Month,
  weekdays: string[]
): number[] {
  const currentMonthIndex = months.findIndex(m => m.name === currentMonth.name);
  
  const lastDayOfCurrentMonth = new Date(currentYear, currentMonthIndex, monthDays);
  const lastDayOfWeek = lastDayOfCurrentMonth.toLocaleString('en-US', { weekday: 'long' });
  const lastDayIndex = weekdays.indexOf(lastDayOfWeek);

  const nextMonthDaysToAdd = 6 - lastDayIndex;
  
  const addedDays = [...Array(nextMonthDaysToAdd + 1).keys()]
    .splice(1, nextMonthDaysToAdd);

  return addedDays;
}

export function getMonths(value: number, months: Month[]): Month {
  return months[value];
}