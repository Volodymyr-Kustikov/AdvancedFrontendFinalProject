import './App.module.css'
import React, { useState } from 'react';

import months from './months.json';
import weekdays from '../listOfMonths/weekdays/weekdays.json';
import classes from './App.module.css';
import { Arrows } from '../arrows/arrows';
import { Advice } from '../advice/advice';
import {ListOfMonths} from '../listOfMonths/listOfMonth';
import {Form} from '../form/form'
import { Posts } from '../posts/posts';
// import { Suspense } from 'react';

const arrOfLastIndexes = [];
let currentYear = new Date().getFullYear();


function Calendar() {
  let sumOfDays = 0;
  
  const arrOfDays = [];

  for (let i = 0; i < months.length; i++) {
    sumOfDays += months[i].days;

    const month = months[i];
    for (let j = 1; j <= month.days; j++) {
      

      const date = new Date();
      date.setMonth(i);
      date.setDate(j);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
      let lastIndexofMonth = 0;
      
      if (j === month.days && arrOfLastIndexes.length <= 11) {
        lastIndexofMonth = weekdays.indexOf(dayOfWeek);
        arrOfLastIndexes.push(lastIndexofMonth) 
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


function calculatePrevisiousDays (monthDays, thisMonth, previousMonth, previousMonthDays) {
  const countOfDaysWillBeAdded = arrOfLastIndexes[months.indexOf(previousMonth)] + 1;
  const addedDays = [...Array(previousMonthDays + 1).keys()].splice(previousMonthDays-countOfDaysWillBeAdded);

  return addedDays;
}

function calculateNextDays (monthDays, currentMonth) {
  const countOfDaysWillBeAdded = arrOfLastIndexes[months.indexOf(currentMonth)] + 1;
  const addedDays = [...Array(monthDays + 1).keys()].splice(1, 7 - countOfDaysWillBeAdded);

  return addedDays;
}



function daysMatrix(monthDays, currentMonth, previousMonth, previousMonthDays, setValueDay, valueDay) {
  const calculating = calculatePrevisiousDays(monthDays, currentMonth, previousMonth, previousMonthDays);
  const nextDaysCalculating = calculateNextDays(monthDays, currentMonth);

  const contentDays = calculating.concat([...Array(monthDays+1).keys()].splice(1,monthDays+1).concat(nextDaysCalculating));
  return new Array(6).fill([]).map((week, weekIndex) => (
    <tr key={weekIndex} className={classes.week}>
      {new Array(7).fill(null).map((day, dayIndex) => {
        const dayNumber = weekIndex * 7 + dayIndex + 1;

        // i should read about [...Array().keys]. Cause I lose the last day of month
        // also i should delete '0' from the arr of days
        if (dayNumber <= monthDays + calculating.length + nextDaysCalculating.length ) {

          return (
            <>
              
                <td 
                  onClick={() => {
                    setValueDay(contentDays[dayNumber])}
                  }
                  key={dayIndex} className={`${classes.day} ${dayNumber >= calculating.length && dayNumber < monthDays + calculating.length 
                    ? classes.currentDays : classes.unActiveDays } ${contentDays[dayNumber] === valueDay ? classes.selectedDay : ''} `}>
  
                      {contentDays[dayNumber]}
                    
                </td>
              
            </>
          );
        }
        
        return null;
      })}

    </tr>

  ));
}



function getMonths(value) {
  let currentMonth = months[value].name;

  return currentMonth;
}

function App() {

  const date = new Date();

  const [valueDay, setValueDay] = useState(date.getDate());

  const [year, setYear] = useState(currentYear);
  const [value, setValue] = useState(date.getMonth()+1);
  const [posts, setPosts] = useState([])

  const nextMonth = getMonths(value);
  const calendar = Calendar();


  return (
    <div className={classes.frame}>
      <div className={classes.navigation}>
        <div className={classes.advice}>

          <Advice />
        </div>

        <div className={classes.arrows}>

          <Arrows value={value} setValue={setValue} nextMonth={nextMonth} months={months}/>
        </div>
        
      </div>

      <div className={classes.main}>
        <ListOfMonths
          months={months}
          thisMonth={nextMonth}
          weekdays={weekdays}
          daysMatrix={daysMatrix}
          year={year}
          valueDay={valueDay}
          setValueDay={setValueDay}
        />

        <div className={classes.posts}>
          <Posts posts={posts} />
        </div>

        <div className={classes.form}>
          <Form
            valueDay={valueDay}
            currentMonth={nextMonth}
            year={year}
            posts={posts}
            setPosts={setPosts}
            
          />
        </div>
      </div>

    </div>
  );
}

export default App;
