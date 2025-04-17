import React, { useState, Suspense } from 'react';
import classes from './App.module.css';
// Components
import { Arrows } from '../arrows/arrows';
import { Advice } from '../advice/advice';
import { ListOfMonths } from '../listOfMonths/listOfMonth';
import { Form } from '../form/form';
import { Posts } from '../posts/posts';

// Types
import { Post, Month } from './businessLogic/types';

// Custom hooks
import { useCalendar } from './businessLogic/useOfCalendar';
import { CalendarMatrix } from './businessLogic/calendarMatrix';

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
  console.log('classes:', classes);
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
            day={valueDay}
            
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
      
    </div>
  );
};

export default App;