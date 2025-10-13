import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from "./pages/Navbar"
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div>

      <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element = {<Contact />}  />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;