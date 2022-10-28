import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from './Context/notes/NoteState';
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  return (
    <NoteState >
      <Router>
        <Navbar />
        <Alert message='coool!'/>
        <h3 className="text-center">iNotebook - Your notebook on the cloud</h3>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
