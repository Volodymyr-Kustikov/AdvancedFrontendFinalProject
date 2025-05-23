import React from 'react';
import classes from './advice.module.css';
import { Month } from '../App/businessLogic/types';

interface AdviceProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  nextMonth: string;
  months: Month[];
}

export const Advice: React.FC<AdviceProps> = ({
  value,
  setValue,
  nextMonth,
  months
}) => {

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
    <div className={classes.information}>
      <div className={classes.incription}>
        Set ur death date !
      </div>
      <div className={classes.navigations}>
        <div className={classes.navigation1}>
          <a className={classes.arrow} onClick={() => handleArrowClick(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"> 
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> 
            </svg> 
          </a>
        </div>
        <div className={classes.navigation1}>
          <a className={classes.arrow} onClick={() => handleArrowClick(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"> 
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> 
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};