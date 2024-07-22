/*global chrome*/

import React, { useState, useEffect } from 'react';
import './App.css';
import DailyGrowthChecklist from './components/DailyGrowthChecklist';
import GoogleKeepWidget from './components/GoogleKeep';
import GoogleSlides from './components/GoogleSlides';
import TILCorner from './components/TILCorner';
import Switch from './components/Switch/Switch';
import storage from './utils/storage';
import Announcements from './components/announcements';
import GoogleMeetWidget from './components/google-meet-widget';
import PomodoroTimer from './components/pomodoro-timer';

function App() {
  const [widgets, setWidgets] = useState({
    keep: true,
    DGC: true,
    TIL: true,
    Slides: true,
    pomodoro: true,
    meet: true,
    announcement: true
  });
  const date=new Date().toDateString();

  // Load widget states from localStorage on initial render
  useEffect(() => {
    storage.get('widgetStates', (result) => {
      if (result.widgetStates) {
        setWidgets(JSON.parse(result.widgetStates));
      }
    });
  }, []);

  const handleSwitchChange = (widget) => (event) => {
    const newValue = event.target.checked;
    setWidgets((prev) => {
      const updatedWidgets = { ...prev, [widget]: newValue };
      storage.set({ widgetStates: JSON.stringify(updatedWidgets) });
      return updatedWidgets;
    });
  };

  return (
    <div className="App flex w-full bg-black/80">
      <div className='w-[40%] flex flex-col items-center py-[250px]'>
        <h1 className='text-7xl tracking-widest font-light text-white '>HYPERVERGE</h1>
        <p className='text-5xl tracking-wide font-extralight my-6 text-white'>{date}</p>
      </div>
      <div className='w-[60%] flex flex-col gap-4'>
        <div className={`flex flex-col gap-2 p-4 border-[1px] border-white rounded-lg  ${!widgets.announcement && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
          <Announcements />
          <Switch value={widgets.announcement} onChange={handleSwitchChange('announcement')} />
        </div>
        <div className='flex gap-4'>
          <div className={`flex flex-col border-[1px] border-white rounded-lg flex-1 gap-2 p-4  ${!widgets.meet && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
            <GoogleMeetWidget />
            <Switch value={widgets.meet} onChange={handleSwitchChange('meet')} />
          </div>
          <div className={`flex flex-col border-[1px] border-white rounded-lg flex-1 gap-2 p-4  ${!widgets.pomodoro && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
            <PomodoroTimer />
            <Switch value={widgets.pomodoro} onChange={handleSwitchChange('pomodoro')} />
          </div>
        </div>
        <div className={`flex flex-col gap-2 p-4 border-[1px] border-white rounded-lg ${!widgets.Slides && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
          <GoogleSlides />
          <Switch value={widgets.Slides} onChange={handleSwitchChange('Slides')} />
        </div>
        <div className='flex gap-4'>
          <div className={`flex flex-col gap-2 border-[1px] border-white flex-1 rounded-lg p-4  ${!widgets.DGC && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
            <DailyGrowthChecklist />
            <Switch value={widgets.DGC} onChange={handleSwitchChange('DGC')} />
          </div>
          <div className={`flex flex-col gap-2 border-[1px] border-white flex-1 rounded-lg p-4  ${!widgets.TIL && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
            <TILCorner />
            <Switch value={widgets.TIL} onChange={handleSwitchChange('TIL')} />
          </div>
        </div>
        <div className={`flex flex-col gap-2 p-4 border-[1px] border-white w-full rounded  ${!widgets.keep && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
          <GoogleKeepWidget />
          <Switch value={widgets.keep} onChange={handleSwitchChange('keep')} />
        </div>
        {/* <div className={`flex flex-col gap-2 p-4  ${!widgets.Slides && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <GoogleMeetWidget />
        <Switch value={widgets.meet} onChange={handleSwitchChange('meet')} />
      </div>
      <div className={`flex flex-col gap-2 p-4  ${!widgets.Slides && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <PomodoroTimer />
        <Switch value={widgets.pomodoro} onChange={handleSwitchChange('pomodoro')} />
      </div>
      <div className={`flex flex-col gap-2 p-4  ${!widgets.DGC && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <DailyGrowthChecklist />
        <Switch value={widgets.DGC} onChange={handleSwitchChange('DGC')} />
      </div>
      <div className={`flex flex-col gap-2 p-4  ${!widgets.keep && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <GoogleKeepWidget />
        <Switch value={widgets.keep} onChange={handleSwitchChange('keep')} />
      </div>
      <div className={`flex flex-col gap-2 p-4  ${!widgets.TIL && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <TILCorner />
        <Switch value={widgets.TIL} onChange={handleSwitchChange('TIL')} />
      </div>
      <div className={`flex flex-col gap-2 p-4  ${!widgets.Slides && "bg-black brightness-50 transition-all cursor-not-allowed "}`}>
        <GoogleSlides />
        <Switch value={widgets.Slides} onChange={handleSwitchChange('Slides')} />
      </div> */}

        {/* Uncomment if needed */}
        {/* <Chatbot /> */}
      </div>
    </div>
  );
}

export default App;
