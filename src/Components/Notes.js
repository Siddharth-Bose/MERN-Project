import React, { useContext,useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const context = useContext(NoteContext);
    // console.log(context);
    const { notes, getAllNotes, editNote } = context;
    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        console.log('Updating the note',note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }
    return (
        <>
            <AddNote />
            <button type="button" className="d-none btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container">
                {notes.length===0 && 'No Notes to Display'}
                </div>
                {notes.map(note => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
