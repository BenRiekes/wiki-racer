import React from 'react';
import {Route, Routes } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import GameContainer  from './Pages/Play/GameContainer';



function App() {

  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/play' element={<GameContainer/>}/>
        </Routes>
      </div>
    
    </>
  );
}

export default App
