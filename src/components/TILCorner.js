/*global chrome*/
import React, { useState, useEffect } from 'react';
import storage from '../utils/storage';

const TILCorner = () => {
  const [tilEntries, setTilEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toDateString(),
    title: "",
    description: "",
    relevantLink: ""
  });

  useEffect(() => {
    // Load TIL entries from storage on initial render
    storage.get('tilEntries', (result) => {
      if (result.tilEntries) {
        setTilEntries(JSON.parse(result.tilEntries));
      }
    });
  }, []);

  const addEntry = () => {
    if (newEntry.title.trim() !== "" && newEntry.description.trim() !== "") {
      const updatedEntries = [...tilEntries, { id: Date.now(), ...newEntry }];
      setTilEntries(updatedEntries);
      setNewEntry({ date: new Date().toDateString(), title: "", description: "", relevantLink: "" });
      storage.set({ tilEntries: JSON.stringify(updatedEntries) });
    }
  };

  const deleteEntry = (id) => {
    const updatedEntries = tilEntries.filter(entry => entry.id !== id);
    setTilEntries(updatedEntries);
    storage.set({ tilEntries: JSON.stringify(updatedEntries) });
  };

  const openLink = (link) => {
    let validLink = link;
    if (!/^https?:\/\//i.test(link)) {
      validLink = 'http://' + link;
    }
    window.open(validLink, '_blank');
  };

  const handleEntryKey = (event) => {
    if (event.key === "Enter") {
      addEntry()
    }
  }

  return (
    <div className="til-corner flex flex-col bg-white shadow-lg rounded-lg p-6 w-full  mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-blue-600">Today I Learned</h3>
      <div className="mb-4" onKeyPress={handleEntryKey}>
        <input
          type="text"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          placeholder="Title"
          className="w-full px-2 py-1 text-base border border-gray-300 rounded mb-2 focus:outline-none"
        />
        <textarea
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          placeholder="Description"
          className="w-full px-2 py-1 text-base border border-gray-300 rounded mb-2 focus:outline-none"
          rows="3"
        />
        <input
          type="text"
          value={newEntry.relevantLink}
          onChange={(e) => setNewEntry({ ...newEntry, relevantLink: e.target.value })}
          placeholder="Link"
          className="w-full px-2 py-1 text-base border border-gray-300 rounded mb-2 focus:outline-none"
        />
        <button
          onClick={addEntry}
          className="w-full bg-blue-500 text-white font-medium tracking-wide py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Entry
        </button>
      </div>
      <ul className="til-list space-y-2">
        {tilEntries.map((entry) => (
          <li key={entry.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
            <div>
              <p className='text-xs tracking-wider'>{entry.date}</p>
              <h4 className=" text-2xl font-medium tracking-wide">{entry.title}</h4>
              <p className='text-base font-light tracking-wide'>{entry.description}</p>
              {entry.relevantLink && (
                <button onClick={() => openLink(entry.relevantLink)} className="text-blue-500 underline">
                  {entry.relevantLink}
                </button>
              )}
            </div>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TILCorner;
