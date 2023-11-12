import './App.css';
import AddPost from './Components/AddPost';
import BottomNav from './Components/BottomNav';
import Feed from './Components/Feed';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import Search from './Components/Search';
import Comments from './Components/Comments';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProfile from './Components/MyProfile';
import Login from './Components/Login';
import { createContext, useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import Chats from './Components/Chats';

const appState = createContext()
function App() {
  const auth = getAuth()
  const [login, setLogin]=useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log('ywas')
      setLogin(true)
    }
    else{
      console.log('no')
      setLogin(false)
    }
  },[])
  })
  
  return (
    <appState.Provider value={{login, setLogin}} >

    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Feed/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/home' element={<Feed/>}/>
          <Route path='/add' element={<AddPost/>}/>
          <Route path='/chat' element={<Messages/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/messages' element={<Messages/>}/>
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/profile/:userID' element={<Profile/>}/>
          <Route path='/myprofile' element={<MyProfile/>}/>
          <Route path='/home/:id/comments' element={<Comments/>}/>
        </Routes>
       
        
      </div>
    </Router>
    </appState.Provider>
  );
}

export default App;
export {appState}