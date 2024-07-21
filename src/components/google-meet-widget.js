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
    <div>
      <h2>Google Meet</h2>
      <input 
        type="text" 
        placeholder="Enter meeting code or link" 
        value={meetingCode}
        onChange={handleInputChange}
      />
      <button onClick={joinMeeting}>Join Meeting</button>
      <div>
        <button onClick={createInstantMeeting}>Create Instant Meeting</button>
        <button onClick={scheduleMeeting}>Schedule Meeting</button>
      </div>
    </div>
  );
};

export default GoogleMeetWidget;


