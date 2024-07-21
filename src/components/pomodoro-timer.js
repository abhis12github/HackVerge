import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
  const workDuration = 1 * 10; // 25 minutes in seconds
  const breakDuration = 1 * 8; // 5 minutes in seconds

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
    <div>
      <h2>{isWorkMode ? 'Work Mode' : 'Break Mode'}</h2>
      <div>{formatTime(secondsLeft)}</div>
      <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;

