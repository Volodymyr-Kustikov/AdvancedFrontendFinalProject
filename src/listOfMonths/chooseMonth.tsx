import React from 'react';
import classes from './chooseMonth.module.css';

interface ChooseMonthProps {
  thisMonth: string;
  valueDay: number;
  year: number;
}

export const ChooseMonth: React.FC<ChooseMonthProps> = ({ thisMonth, valueDay, year }) => {
  return (
    <div className={classes.panel}>
      <div className={classes.month}>
        {thisMonth}
      </div>
      <div className={classes.currentDay}>
        {valueDay}
      </div>
      <div className={classes.year}>
        {year}
      </div>
    </div>
  );
};
