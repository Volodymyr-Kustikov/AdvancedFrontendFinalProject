import React from 'react';
import classes from './arrows.module.css';
import { Month } from '../App/types';

interface ArrowsProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  nextMonth: string;
  months: Month[];
}

export const Arrows: React.FC<ArrowsProps> = ({ value, setValue, nextMonth, months }) => {
  const handleArrowClick = (increment: number): void => {
    let theNumber = value + increment;
    if (theNumber >= 12) {
      setValue(0);
    } else if (theNumber < 0) {
      setValue(11);
    } else {
      setValue(theNumber);
    }
  };

  return (
    <div className={classes.cover}>
      <div className={classes.container}>
        <a className={classes.arrow} onClick={() => handleArrowClick(-1)}>
          <div className={`${classes.eye} ${classes.eye1}`}></div>
        </a>
        <a className={classes.arrow} onClick={() => handleArrowClick(1)}>
          <div className={`${classes.eye} ${classes.eye2}`}></div>
        </a>
        <div className={classes.blink}></div>
        <div className={classes.blink2}></div>
      </div>
    </div>
  );
};