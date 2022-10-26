import React from "react";
import { useState } from "react";
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);

    // Get Notes
    const getAllNotes=async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },
        });
        const json = await response.json()
        setNotes(json);
    }
    //Add a Note
    const addNote =async (title, description, tag) => {
        const response = await fetch(`${host}/localhost:5000/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },

            body: JSON.stringify({title,description,tag})
        });
        console.log('Adding a new Note')
        const note = {
            "_id": "7",
            "user": "631187cd60716ca3b064098d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-09-13T11:00:27.791Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = (id) => {
        console.log("Deleting Note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit a Note
    // API CALL

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/localhost:5000/api/notes/updatenote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },

            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();
        console.log(json)
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;