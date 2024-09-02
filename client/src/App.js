import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Avatar from "./Pages/Avatar"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/avatar' element={<Avatar/>} />
      </Routes>
    </BrowserRouter>
  )
}
