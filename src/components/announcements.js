import React, { useState, useEffect } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const spreadsheetId = '1nQdH7ZfF7ASa8f4KBJKIg05EoDAo3RTz8k3X4jAVSLM'; // Replace with your Google Sheet ID
  // const apiKey = ''; // Replace with your API key
  const hey="Key daalna hai"

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:B?key=${hey}`
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
    <div className='flex flex-col gap-10 tracking-wider  bg-white py-5 rounded-lg'>
      <h2 className='text-5xl font-normal self-center '>Company Announcements</h2>
      <ul className='flex list-disc flex-col gap-2 '>
        {announcements.map((announcement, index) => (
          <li className='flex flex-col w-[80%] self-center p-4  rounded-3xl  hover:text-black transition-all cursor-pointer duration-[0.4s]'>
            <div key={index} className='flex flex-col gap-1'>
              <h3 className='text-2xl  font-normal'>{announcement[0]}</h3>
              <ul>
                <li><p className='text-xl ml-3 font-light'>{announcement[1]}</p></li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
