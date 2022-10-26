import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext';

function AddNote() {
    const context = useContext(NoteContext);
    // console.log(context);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h1 >Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote