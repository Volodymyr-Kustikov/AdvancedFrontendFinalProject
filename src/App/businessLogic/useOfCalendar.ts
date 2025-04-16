import { useState } from 'react';
import { Month, DayInfo } from './types';
import { currentYear, arrOfLastIndexes } from './utils';

import monthsData from '../months.json';
import weekdaysData from '../../listOfMonths/weekdays/weekdays.json';

export function useCalendar() {
  const date = new Date();
  const [valueDay, setValueDay] = useState<number>(date.getDate());
  const [year, setYear] = useState<number>(currentYear);
  const [value, setValue] = useState<number>(date.getMonth());

  const months: Month[] = monthsData;
  const weekdays: string[] = weekdaysData;

  function generateCalendar(): DayInfo[] {
    const arrOfDays: DayInfo[] = [];

    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      
      for (let j = 1; j <= month.days; j++) {
        const date = new Date(currentYear, i, j);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        
        if (j === month.days && arrOfLastIndexes.length <= 11) {
          const lastIndexofMonth = weekdays.indexOf(dayOfWeek);
          arrOfLastIndexes.push(lastIndexofMonth);
        }

        arrOfDays.push({
          day: j,
          month: month.name,
          dayOfWeek: dayOfWeek,
        });
      }
    }

    return arrOfDays;
  }

  const nextMonth = months[value];
  const previousMonthIndex = value === 0 ? months.length - 1 : value - 1;
  const previousMonth = months[previousMonthIndex];
  const calendar = generateCalendar();

  return {
    valueDay,
    setValueDay,
    year,
    setYear,
    value,
    setValue,
    months,
    weekdays,
    nextMonth,
    previousMonth,
    calendar
  };
}