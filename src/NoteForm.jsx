import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ selectedDate, onNoteAdded }) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/notes', { date: selectedDate, note })
            .then(response => {
                setNote('');
                onNoteAdded();
            })
            .catch(error => {
                console.error('Error creating note: ', error);
            });
    };

    return (
        <div>
            <h2>Skapa Event {selectedDate.toDateString()}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NoteForm;

