import React, { useState, Dispatch, SetStateAction, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HalloweenPumpkin } from './PumpkinModel.jsx';
import ModelSnowman from '../../public/Snowman.jsx';
import classes from './App.module.css';
import * as THREE from 'three'

import monthsData from './months.json';
import weekdaysData from '../listOfMonths/weekdays/weekdays.json';
import { Arrows } from '../arrows/arrows.tsx';
import { Advice } from '../advice/advice.tsx';
import { ListOfMonths } from '../listOfMonths/listOfMonth.tsx';
import { Form } from '../form/form.tsx';
import { Posts } from '../posts/posts.tsx';
import { Month, Post, DayInfo } from './types';


const arrOfLastIndexes: number[] = [];
let currentYear = new Date().getFullYear();

const months: Month[] = monthsData;
const weekdays: string[] = weekdaysData;

function Calendar(): DayInfo[] {
  let sumOfDays = 0;
  
  const arrOfDays: DayInfo[] = [];

  for (let i = 0; i < months.length; i++) {
    sumOfDays += months[i].days;

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

function calculatePreviousDays(
  monthDays: number, 
  currentMonth: Month, 
  previousMonth: Month, 
  previousMonthDays: number
): number[] {

  const currentMonthIndex = months.indexOf(currentMonth);
  
  const firstDayOfCurrentMonth = new Date(currentYear, currentMonthIndex, 1);
  const firstDayOfWeek = firstDayOfCurrentMonth.toLocaleString('en-US', { weekday: 'long' });
  const firstDayIndex = weekdays.indexOf(firstDayOfWeek);

  const previousMonthDaysToAdd = firstDayIndex;
  
  const addedDays = [...Array(previousMonthDays + 1).keys()]
    .splice(previousMonthDays - previousMonthDaysToAdd, previousMonthDaysToAdd);

  return addedDays;
}

function calculateNextDays(
  monthDays: number, 
  currentMonth: Month
): number[] {

  const currentMonthIndex = months.indexOf(currentMonth);
  
  const lastDayOfCurrentMonth = new Date(currentYear, currentMonthIndex, monthDays);
  const lastDayOfWeek = lastDayOfCurrentMonth.toLocaleString('en-US', { weekday: 'long' });
  const lastDayIndex = weekdays.indexOf(lastDayOfWeek);

  const nextMonthDaysToAdd = 6 - lastDayIndex;
  
  const addedDays = [...Array(nextMonthDaysToAdd + 1).keys()]
    .splice(1, nextMonthDaysToAdd);

  return addedDays;
}

function daysMatrix(
  monthDays: number, 
  currentMonth: Month, 
  previousMonth: Month, 
  previousMonthDays: number, 
  setValueDay: Dispatch<SetStateAction<number>>, 
  valueDay: number
): React.ReactElement[] {
  const calculating = calculatePreviousDays(monthDays, currentMonth, previousMonth, previousMonthDays);
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

function getMonths(value: number): Month {
  return months[value];
}

const App: React.FC = () => {
  const date = new Date();

  const [valueDay, setValueDay] = useState<number>(date.getDate());
  const [year, setYear] = useState<number>(currentYear);
  const [value, setValue] = useState<number>(date.getMonth());
  const [posts, setPosts] = useState<Post[]>([]);

  const nextMonth = getMonths(value);
  const calendar = Calendar();
  
  const previousMonthIndex = value === 0 ? months.length - 1 : value - 1;
  const previousMonth = months[previousMonthIndex];

  return (
    <div className={classes.frame}>
      <div className={classes.navigation}>
        <div className={classes.advice}>
          <Advice />
        </div>

        <div className={classes.arrows}>
          <Arrows 
            value={value} 
            setValue={setValue} 
            nextMonth={nextMonth.name} 
            months={months} 
          />
        </div>
      </div>

      <div className={classes.main}>
        <ListOfMonths
          months={months}
          thisMonth={nextMonth.name}
          weekdays={weekdays}
          daysMatrix={daysMatrix}
          year={year}
          valueDay={valueDay}
          setValueDay={setValueDay}
          currentMonth={nextMonth}
          previousMonth={previousMonth}
        />

        <div className={classes.posts}>
          <Posts posts={posts} />
        </div>

        <div className={classes.form}>
          <Form
            valueDay={valueDay}
            currentMonth={nextMonth.name}
            year={year}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      </div>
      {/* <Canvas style={{ height: '300px', width: '100%' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <HalloweenPumpkin scale={0.5} />
          <OrbitControls />
        </Suspense>
      </Canvas> */}
      
      <Canvas style={{ height: '300px', width: '100%' }}>
        {/* @ts-ignore */}
          <ambientLight intensity={5} />
          <OrbitControls />
          <Suspense fallback={null}>

          </Suspense>
          <ModelSnowman scale={0.5} />
      </Canvas>
    </div>
    
  );
};

export default App;