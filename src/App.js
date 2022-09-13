import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <h3 className="text-center">iNotebook - Your notebook on the cloud</h3>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
