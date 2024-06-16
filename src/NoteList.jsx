import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/notes')
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error('Error fetching notes: ', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/notes/${id}`)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch(error => {
                console.error('Error deleting note: ', error);
            });
    };

    return (
        <div>
            <h2>Saved Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {note.date}: {note.note}
                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
