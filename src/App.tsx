import React from 'react';
import {Route, Routes } from "react-router-dom";
import { GameProvider } from './Context/GameContext';
import Navbar from './Componenets/Navbar';
import Home from './Pages/Home/Home';
import GameContainer  from './Pages/Play/GameContainer';
import Profile from './Pages/Profile/Profile';


function App() {

  return (
    <>

      <GameProvider>

        <Navbar />

        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/play' element={<GameContainer/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Routes>
        </div>
      </GameProvider>


    </>
  );
}

export default App
