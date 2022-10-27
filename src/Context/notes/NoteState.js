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
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },
            body: JSON.stringify({title,description,tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },

            body: JSON.stringify({id})
        });
        const json = await response.json();
        console.log("Deleting Note with id" + id, json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit a Note
    // API CALL

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMTg3Y2Q2MDcxNmNhM2IwNjQwOThkIn0sImlhdCI6MTY2MzA0NzgyN30.4cbhnf9md3WnAKjCMHC1XLbdc6wy1wi1yehKlzCGY58'
            },

            body: JSON.stringify({title,description,tag})
        });
        const json =await response.json();
        console.log(json)
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;