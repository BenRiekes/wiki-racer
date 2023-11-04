import React from 'react';
import {Route, Routes } from "react-router-dom";

import Navbar from './Componenets/Navbar';
import Home from './Pages/Home/Home';
import Play from './Pages/Play/Play';
import Profile from './Pages/Profile/Profile';


function App() {

  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/play' element={<Play/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App
