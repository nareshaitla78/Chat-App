import React from 'react';

import Register from './pages/Register';

import Login from './pages/Login';
import Chat from './pages/Chat';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
 
export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/chat" element={<Chat />}></Route>

    </Routes>
    </BrowserRouter>

  )
}

