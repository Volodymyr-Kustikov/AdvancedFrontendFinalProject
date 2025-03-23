import React from 'react';
import classes from './weekdaysSchedule.module.css';
import { Month } from '../../App/types';

interface WeekdaysProps {
  months: Month[];
  thisMonth: string;
  weekdays: string[];
  daysMatrix: (
    monthDays: number, 
    currentMonth: string, 
    previousMonth: Month, 
    previousMonthDays: number, 
    setValueDay: React.Dispatch<React.SetStateAction<number>>, 
    valueDay: number
  ) => JSX.Element[];
  setValueDay: React.Dispatch<React.SetStateAction<number>>;
  valueDay: number;
}

export const Weekdays: React.FC<WeekdaysProps> = ({ 
  months, 
  thisMonth, 
  weekdays, 
  daysMatrix, 
  setValueDay, 
  valueDay 
}) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.schedule}>
          {weekdays.map((weekday, index) => (
            <th key={index} className={classes.weekday}>
              {weekday.substring(0, 3)}
            </th>
          ))}
        </tr>
      </thead>
      
      <tbody className={classes.numbers}> 
        {months.map((month, index) => (
          month.name === thisMonth && (
            <React.Fragment key={month.name}>
              {months.map((m, i) => (
                m.name === thisMonth && (
                  <React.Fragment key={`matrix-${m.name}`}>
                    {daysMatrix(
                      m.days, 
                      m.name, 
                      months[i > 0 ? i - 1 : months.length - 1], 
                      months[i].days, 
                      setValueDay, 
                      valueDay
                    )}
                  </React.Fragment>
                )
              ))}
            </React.Fragment>
          )
        ))}
      </tbody>
    </table>
  );
};