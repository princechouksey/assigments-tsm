import React from 'react'
import Login from './pages/login'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './Dashboard'
import UpdateUser from './pages/UpdateUser'
import ChatRoom from './components/ChatRoom'
import ChatList from './components/ChatList'
import VideoChat from './components/VideoChat'
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element = {<Dashboard />} />
    <Route path='/login'  element= {<Login />} />
    <Route path='/signup' element = {<Signup />} />
    <Route path='/update-profile' element  ={<UpdateUser />} />
    <Route path="/chat" element={<ChatRoom roomId="global" />} /> 
    <Route path='/chat/:roomId' element = {<ChatRoom /> } />
    <Route path='/chats' element= {<ChatList />} />
    <Route path='/video-chat/:roomId' element={<VideoChat />} />
   </Routes>



   </>
  )
}

export default App