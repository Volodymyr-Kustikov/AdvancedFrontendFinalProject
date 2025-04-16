import React, { useState, Suspense } from 'react';
import classes from './App.module.css';

// addons for three-js
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// 3d models
import { HalloweenPumpkin } from './PumpkinModel.jsx';
import ModelSnowman from './Snowman.jsx';

// Components
import { Arrows } from '../arrows/arrows.tsx';
import { Advice } from '../advice/advice.tsx';
import { ListOfMonths } from '../listOfMonths/listOfMonth.tsx';
import { Form } from '../form/form.tsx';
import { Posts } from '../posts/posts.tsx';

// Types
import { Post, Month } from './types.ts';

// Custom hooks
import { useCalendar } from './useOfCalendar.ts';
import { CalendarMatrix } from './calendarMatrix.tsx';

interface ListOfMonthsProps {
  months: Month[];
  thisMonth: string;
  weekdays: string[];
  daysMatrix: (
    monthDays: number, 
    currentMonth: Month, 
    previousMonth: Month, 
    previousMonthDays: number
  ) => React.ReactElement[];
  year: number;
  valueDay: number;
  setValueDay: React.Dispatch<React.SetStateAction<number>>;

}

const App: React.FC = () => {
  const {
    valueDay,
    setValueDay,
    year,
    months,
    weekdays,
    value,
    setValue,
    nextMonth,
    previousMonth
  } = useCalendar();
  
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className={classes.frame}>
      <div className={classes.navigation}>
        <div className={classes.advice}>
          <Advice 
            value={value} 
            setValue={setValue} 
            nextMonth={nextMonth.name} 
            months={months} 
          />
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
          daysMatrix={(monthDays, currentMonth, previousMonth, previousMonthDays) => 
            CalendarMatrix({
              monthDays,
              currentMonth: nextMonth, 
              previousMonth,
              previousMonthDays,
              setValueDay,
              valueDay,
              weekdays
            })
          }
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
            currentMonth={nextMonth.name}
            year={year}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      </div>
      
      <Canvas style={{ height: '300px', width: '100%' }}>
        <ambientLight intensity={5} />
        <OrbitControls />
        <Suspense fallback={null}>
          <ModelSnowman scale={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;