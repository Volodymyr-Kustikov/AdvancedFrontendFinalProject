import React, { Suspense, useEffect } from 'react';
import classes from './arrows.module.css';
import { Month } from '../App/businessLogic/types';
import { HalloweenPumpkin } from '../App/PumpkinModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useDispatch, useSelector } from "react-redux";

interface ArrowsProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  nextMonth: string;
  months: Month[];
  day: number;
}

interface RootState {
  month: number;
}

export const Arrows: React.FC<ArrowsProps> = ({ value, setValue, nextMonth, months, day }) => {
  const dispatch = useDispatch();
  const month = useSelector((state: RootState) => state.month)


  useEffect(() => {
    setValue(month);
  }, [month])

  console.log("Arrows rendering with:", { day, value, dayType: typeof day, valueType: typeof value });

  return ( 
    <div className={classes.cover}>
      {day === 31 && value === 9 ? (
        <div className={classes.canvasContainer}>
          <Canvas 
            style={{ height: '400px', width: '400px' }} 
            shadows 
            gl={{ antialias: true, alpha: true }}
            camera={{ 
              position: [0, 0, 5], 
              fov: 50,
              near: 0.1,
              far: 1000
            }}
          >
            <Suspense fallback={null}>
              <HalloweenPumpkin />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <div className={classes.container}>
          <a className={classes.arrow} onClick={() => dispatch({type:"DECREMENT"})}>
            <div className={`${classes.eye} ${classes.eye1}`}></div>
          </a>
          <a className={classes.arrow} onClick={() => dispatch({type:"INCREMENT"})}>
            <div className={`${classes.eye} ${classes.eye2}`}></div>
          </a>
          <div className={classes.blink}></div>
          <div className={classes.blink2}></div>
        </div>
      )}
    </div>
  );
};