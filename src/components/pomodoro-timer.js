import React, { useState, useEffect, useRef } from 'react';
import { MdNotStarted } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";




const PomodoroTimer = () => {
  const workDuration = 25 * 60; // 25 minutes in seconds
  const breakDuration = 5 * 60; // 5 minutes in seconds

  const [secondsLeft, setSecondsLeft] = useState(workDuration);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            if (isWorkMode) {
              setIsWorkMode(false);
              return breakDuration;
            } else {
              setIsWorkMode(true);
              return workDuration;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isWorkMode]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSecondsLeft(isWorkMode ? workDuration : breakDuration);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  };

  return (
    <div className='flex flex-col justify-center bg-white h-full py-3 rounded-lg items-center'>
      <h2 className='text-2xl font-medium tracking-wide '>{isWorkMode ? 'Work Mode' : 'Break Mode'}</h2>
      <div className='border-[4px] border-white rounded-[50%] mt-10 py-10 px-5'>
        <p className='text-4xl font-semibold '>{formatTime(secondsLeft)}</p>
      </div>
      <div className='flex gap-4 mt-3'>
        <button onClick={toggleTimer}>{isRunning ? <FaRegStopCircle  className='text-2xl '/> : <MdNotStarted  className='text-2xl '/>}</button>
        <button onClick={resetTimer}><GrPowerReset  className='text-2xl '/></button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

