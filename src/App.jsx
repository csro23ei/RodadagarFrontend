import React, { useState } from 'react';
import './App.css';
import HolidayCalendar from './HolidayCalendar';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleNoteAdded = () => {
    setSelectedDate(null); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Din kalender</h1>
      </header>
      <main>
        <HolidayCalendar onDateClick={handleDateClick} />
        {selectedDate && (
          <NoteForm selectedDate={selectedDate} onNoteAdded={handleNoteAdded} />
        )}
        <NoteList />
      </main>
    </div>
  );
}

export default App;
