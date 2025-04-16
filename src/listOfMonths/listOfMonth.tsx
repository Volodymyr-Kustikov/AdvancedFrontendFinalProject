import React from 'react';
import classes from './listOfMonth.module.css';
import { ChooseMonth } from './chooseMonth';
import { Weekdays } from './weekdays/weekdaysSchedule';
import { Month } from '../App/businessLogic/types';
import { JSX } from 'react';

interface ListOfMonthsProps {
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
  year: number;
  valueDay: number;
  setValueDay: React.Dispatch<React.SetStateAction<number>>;
}

export const ListOfMonths: React.FC<ListOfMonthsProps> = ({ 
  months, 
  thisMonth, 
  weekdays, 
  daysMatrix, 
  year, 
  valueDay, 
  setValueDay 
}) => {
  return (
    <div className={classes.listOfMonths}>
      <ChooseMonth thisMonth={thisMonth} valueDay={valueDay} year={year} />
      <Weekdays 
        months={months} 
        thisMonth={thisMonth} 
        weekdays={weekdays} 
        daysMatrix={daysMatrix} 
        setValueDay={setValueDay} 
        valueDay={valueDay} 
      />
    </div>
  );
};