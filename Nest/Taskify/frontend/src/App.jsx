import React from 'react'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <Routes >
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />}  />
      <Route path='/register' element={<Register />} />
    </Routes>
   )
}

export default App