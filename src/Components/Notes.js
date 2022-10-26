import React, { useContext } from 'react'
import { useEffect } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(NoteContext);
    // console.log(context);
    const { notes, getAllNotes } = context;
    useEffect(()=>{
        getAllNotes()
    },[])
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map(note => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
