import classes from './listOfMonth.module.css';
import { ChooseMonth } from './chooseMonth';
import { Weekdays } from './weekdays/weekdaysSchedule';
import React, { useState } from 'react';


export const ListOfMonths = ( {months, thisMonth, weekdays, daysMatrix, year, valueDay, setValueDay} ) => {


  return (
    <div className={classes.listOfMonths}>
      <ChooseMonth thisMonth={thisMonth} valueDay={valueDay} year={year} />
      <Weekdays months={months} thisMonth={thisMonth} weekdays={weekdays} daysMatrix={daysMatrix} setValueDay={setValueDay} valueDay={valueDay} />
    </div>
  )
}