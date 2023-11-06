import React from 'react';
import {Route, Routes } from "react-router-dom";
//import { GameProvider } from './Context/GameContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import GameContainer  from './Pages/Play/GameContainer';
import Profile from './Pages/Profile/Profile';


function App() {

  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/play' element={<GameContainer/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Routes>
      </div>
    
    </>
  );
}

export default App
