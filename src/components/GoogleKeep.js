/*global chrome*/
import React, { useState, useEffect, useRef } from 'react';
import storage from '../utils/storage';

function GoogleKeepWidget() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    // website: "",
    title: "",
    note: "",
    labels: [] // Ensure labels is initialized as an empty array
  });
  const [add, setAdd] = useState(false);
  const labelInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   // Request the current tab's URL from the background script
  //   if (chrome && chrome.runtime) {
  //     chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {
  //       if (response && response.url) {
  //         setNewNote((prev) => ({ ...prev, website: response.url }));
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    storage.get('notes', (result) => {
      if (result.notes) {
        setNotes(JSON.parse(result.notes));
      }
    });
  }, []);

  const saveNote = () => {
    if (newNote.title.trim() !== '' || newNote.note.trim() !== '') {
      const updatedNotes = [...notes, { id: Date.now(), ...newNote }];
      setNotes(updatedNotes);
      setNewNote({ title: "", note: "", labels: [] });
      storage.set({ notes: JSON.stringify(updatedNotes) });
    }
  };

  const handleLabelAdd = () => {
    setAdd(true);
    // labelInputRef?.current?.focus();
    setTimeout(() => {
      document.getElementById("label").focus();
    }, 200)
  };

  const handleLabelKeyPress = (event) => {
    if (event.key === 'Enter') {
      const label = event.target.value.trim();
      if (label && !newNote.labels.includes(label)) {

        setNewNote(prev => ({ ...prev, labels: [...prev.labels, label] }));
        event.target.value = '';
      }
      setAdd(false);
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    storage.set({ notes: JSON.stringify(updatedNotes) });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="google-keep-widget flex flex-col bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-yellow-600">Google Keep</h3>
      <div className="note-input mb-6">
        <p>{newNote.website}</p>
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Title"
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <textarea
          value={newNote.note}
          onChange={(e) => setNewNote(prev => ({ ...prev, note: e.target.value }))}
          placeholder="Take a note..."
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-2"
          rows="3"
        />
        <div className='flex justify-end items-baseline' >
          <div className='flex items-end overflow-x-scroll ' style={{ scrollbarWidth: "none" }}>
            {
              newNote.labels?.map((item, index) => (
                <div key={index} className=" bg-yellow-300 text-yellow-800 px-2 py-1 rounded mr-1">
                  {item}
                </div>
              )) || [] // Ensure an empty array if newNote.labels is undefined
            }
          </div>

          <input
            id='label'
            ref={labelInputRef}
            onKeyPress={handleLabelKeyPress}
            placeholder="Label"
            className={`${add ? "" : "hidden "} focus:outline-none  p-2 border rounded w-[15%]`}
          />

          <button
            onClick={handleLabelAdd}
            className="ml-2 w-[13%]  bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            Add Label
          </button>
        </div>
        <button
          onClick={saveNote}
          className="w-full bg-yellow-500 text-white py-2 rounded-b-lg hover:bg-yellow-600 transition duration-300 mt-2"
        >
          Add
        </button>
      </div>

      <div className="search-input mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <h1>Your Notes</h1>
      <ul className="note-list flex items-stretch overflow-x-scroll gap-3" style={{  scrollbarWidth: "none" }}>
        {filteredNotes.map((note) => (
          <li key={note.id} className="bg-yellow-100 p-3 rounded-lg shadow flex justify-between items-start">
            <div>
              {/* <p>{note.website}</p> */}
              <h4 className="font-semibold">{note.title}</h4>
              <p className="text-gray-800">{note.note}</p>
              <div className="mt-2">
                {note.labels?.map((label, index) => (
                  <span key={index} className="bg-yellow-300 text-yellow-800 px-2 py-1 rounded mr-1">
                    {label}
                  </span>
                )) || []} {/* Ensure an empty array if note.labels is undefined */}
              </div>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        )) || []} {/* Ensure an empty array if notes is undefined */}
      </ul>
    </div>
  );
}

export default GoogleKeepWidget;
