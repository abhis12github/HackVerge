import React, { useState } from 'react';

const GoogleSlidesWidget = () => {
  const [slideUrl, setSlideUrl] = useState(''); // URL for the Google Slides presentation

  // Handle URL change
  const handleUrlChange = (e) => {
    setSlideUrl(e.target.value);
  };

  const handleEnlarge = () => {
    window.open(slideUrl);
  }

  return (
    <div className="google-slides-widget flex flex-col bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-blue-600">Google Slides</h3>
      <input
        type="text"
        value={slideUrl}
        onChange={handleUrlChange}
        placeholder="Enter Google Slides URL"
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {slideUrl && (
        <>
          <iframe
            src={`${slideUrl}`}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
            <button className='px-2 py-1 border-[1px] border-slate-500 hover:bg-slate-300' onClick={handleEnlarge} >Enlarge</button>
        </>
      )}
    </div>
  );
};

export default GoogleSlidesWidget;
