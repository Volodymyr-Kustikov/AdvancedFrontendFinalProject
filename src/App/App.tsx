import React, { useState } from 'react';
import './App.module.css';

import monthsData from './months.json';
import weekdaysData from '../listOfMonths/weekdays/weekdays.json';
import classes from './App.module.css';
import { Arrows } from '../arrows/arrows.tsx';
import { Advice } from '../advice/advice.tsx';
import { ListOfMonths } from '../listOfMonths/listOfMonth.tsx';
import { Form } from '../form/form.tsx';
import { Posts } from '../posts/posts.tsx';
import { Month, Post, DayInfo } from './types.ts';

const arrOfLastIndexes: number[] = [];
let currentYear = new Date().getFullYear();

const months: Month[] = monthsData as Month[];
const weekdays: string[] = weekdaysData as string[];

function Calendar(): DayInfo[] {
  let sumOfDays = 0;
  
  const arrOfDays: DayInfo[] = [];

  for (let i = 0; i < months.length; i++) {
    sumOfDays += months[i].days;

    const month = months[i];
    for (let j = 1; j <= month.days; j++) {
      const date = new Date();
      date.setMonth(i);
      date.setDate(j);
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

function calculatePrevisiousDays(
  monthDays: number, 
  thisMonth: string, 
  previousMonth: Month, 
  previousMonthDays: number
): number[] {
  const countOfDaysWillBeAdded = arrOfLastIndexes[months.indexOf(previousMonth)] + 1;
  const addedDays = [...Array(previousMonthDays + 1).keys()].splice(previousMonthDays - countOfDaysWillBeAdded);
  return addedDays;
}

function calculateNextDays(monthDays: number, currentMonth: string): number[] {
  const countOfDaysWillBeAdded = arrOfLastIndexes[months.indexOf(months.find(m => m.name === currentMonth)!)] + 1;
  const addedDays = [...Array(monthDays + 1).keys()].splice(1, 7 - countOfDaysWillBeAdded);
  return addedDays;
}

function daysMatrix(
  monthDays: number, 
  currentMonth: string, 
  previousMonth: Month, 
  previousMonthDays: number, 
  setValueDay: React.Dispatch<React.SetStateAction<number>>, 
  valueDay: number
): JSX.Element[] {
  const calculating = calculatePrevisiousDays(monthDays, currentMonth, previousMonth, previousMonthDays);
  const nextDaysCalculating = calculateNextDays(monthDays, currentMonth);

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
                dayNumber >= calculating.length && dayNumber < monthDays + calculating.length 
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

function getMonths(value: number): string {
  let currentMonth = months[value].name;
  return currentMonth;
}

const App: React.FC = () => {
  const date = new Date();

  const [valueDay, setValueDay] = useState<number>(date.getDate());
  const [year, setYear] = useState<number>(currentYear);
  const [value, setValue] = useState<number>(date.getMonth());
  const [posts, setPosts] = useState<Post[]>([]);

  const nextMonth = getMonths(value);
  const calendar = Calendar();

  return (
    <div className={classes.frame}>
      <div className={classes.navigation}>
        <div className={classes.advice}>
          <Advice />
        </div>

        <div className={classes.arrows}>
          <Arrows value={value} setValue={setValue} nextMonth={nextMonth} months={months} />
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
};

export default App;