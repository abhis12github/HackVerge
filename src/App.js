import React from 'react';
import './App.css';
import GoogleMeetWidget from './components/google-meet-widget';
import PomodoroTimer from './components/pomodoro-timer';
import Announcements from './components/announcements';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>Test</p>
      <GoogleMeetWidget></GoogleMeetWidget>
      <PomodoroTimer></PomodoroTimer>
      <Announcements></Announcements>
    </div>
  );
}

export default App;
