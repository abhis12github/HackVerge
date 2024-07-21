import React, { useState, useEffect } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const spreadsheetId = '1nQdH7ZfF7ASa8f4KBJKIg05EoDAo3RTz8k3X4jAVSLM'; // Replace with your Google Sheet ID
  const apiKey = ''; // Replace with your API key

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:B?key=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        const rows = data.values.slice(1); // Skip header row
        setAnnouncements(rows);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h2>Company Announcements</h2>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>
            <h3>{announcement[0]}</h3>
            <p>{announcement[1]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
