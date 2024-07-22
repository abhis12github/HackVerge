import React, { useState } from 'react';

const GoogleMeetWidget = () => {
  const [meetingCode, setMeetingCode] = useState('');

  const handleInputChange = (event) => {
    setMeetingCode(event.target.value);
  };

  const joinMeeting = () => {
    let link;
    if (meetingCode.startsWith('https://meet.google.com/')) {
      link = meetingCode;
    } else {
      link = `https://meet.google.com/${meetingCode}`;
    }
    window.location.href = link;
  };

  const createInstantMeeting = () => {
    const link = 'https://meet.google.com/new';
    window.location.href = link;
  };

  const scheduleMeeting = () => {
    const link = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Scheduled+Google+Meet&details=Join+the+meeting+with+this+link:+https://meet.google.com';
    window.location.href = link;
  };

  return (
    <div className='flex flex-col bg-white h-full w-full rounded-lg items-center'>
      <div className='flex flex-col gap-2 items-center'>
        <h2 className='text-2xl font-normal  self-center'>Google Meet</h2>
        <p className='text-sm font-light '>Connect ,Collaborate and celebrate from anywhere with Google Meet.</p>
      </div>
      <div className='flex gap-2 mt-10 mb-3 w-[80%]'>
        <input
          className='px-3 py-1 text-base flex-1 border-[1px] border-black'
          type="text"
          placeholder="Enter meeting code or link"
          value={meetingCode}
          onChange={handleInputChange}
        />
        <button className='px-4 py-1  flex-3 bg-blue-500 ' onClick={joinMeeting}>Join Meeting</button>
      </div>
      <div className='flex gap-1 items-stretch w-[80%]'>
        <button className='px-4 py-1 my-1 flex-1 items-stretch bg-blue-500 ' onClick={createInstantMeeting}>Create Instant Meeting</button>
        <button className='px-4 py-1 my-1  flex-1 items-stretch bg-blue-500 ' onClick={scheduleMeeting}>Schedule Meeting</button>
      </div>
    </div>
  );
};

export default GoogleMeetWidget;


