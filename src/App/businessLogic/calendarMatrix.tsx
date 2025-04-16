import React, { Dispatch, SetStateAction } from 'react';
import { Month } from './types.js';
import { calculatePreviousDays, calculateNextDays } from './utils';
import classes from './App.module.css';

interface DaysMatrixProps {
  monthDays: number;
  currentMonth: Month; 
  previousMonth: Month;
  previousMonthDays: number;
  setValueDay: Dispatch<SetStateAction<number>>;
  valueDay: number;
  weekdays: string[];
}

export function CalendarMatrix({
  monthDays,
  currentMonth,
  previousMonth,
  previousMonthDays,
  setValueDay,
  valueDay,
  weekdays
}: DaysMatrixProps): React.ReactElement[] {
  const calculating = calculatePreviousDays(monthDays, currentMonth, previousMonth, previousMonthDays, weekdays);
  const nextDaysCalculating = calculateNextDays(monthDays, currentMonth, weekdays);

  const contentDays = calculating.concat([...Array(monthDays + 1).keys()].splice(1, monthDays + 1).concat(nextDaysCalculating));
  
  return new Array(6).fill([]).map((week, weekIndex) => (
    <tr key={weekIndex} className={classes.week}>
      {new Array(7).fill(null).map((day, dayIndex) => {
        const dayNumber = weekIndex * 7 + dayIndex + 1;

        if (dayNumber <= monthDays + calculating.length + nextDaysCalculating.length) {
          return (
            <td 
              onClick={() => {
                setValueDay(contentDays[dayNumber - 1]);
              }}
              key={dayIndex} 
              className={`${classes.day} ${
                dayNumber > calculating.length && dayNumber <= monthDays + calculating.length 
                  ? classes.currentDays 
                  : classes.unActiveDays
              } ${contentDays[dayNumber - 1] === valueDay ? classes.selectedDay : ''}`}
            >
              {contentDays[dayNumber - 1]}
            </td>
          );
        }
        
        return null;
      })}
    </tr>
  ));
}