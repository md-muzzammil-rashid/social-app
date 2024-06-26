import './App.css';
import AddPost from './Components/AddPost';
import BottomNav from './Components/BottomNav';
import Feed from './Components/Feed';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import Search from './Components/Search';
import Comments from './Components/Comments';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyProfile from './Components/MyProfile';
import Login from './Components/Login';
import { createContext, useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import Chats from './Components/Chats';
import MessageContainer from './Components/MessageContainer';
import PhotoPreview from './Components/PhotoPreview';
import FollowersList from './Components/FollowersList';
import FollowingList from './Components/FollowingList';
import { useMediaQuery } from 'react-responsive';
import FeedDesktop from './Components/FeedDesktop';
import MidFeed from './Components/MidFeed';

const appState = createContext()
function App() {
  const auth = getAuth()
  const isBigScreen = useMediaQuery({query:'(min-width: 769px)'})
  const [login, setLogin]=useState(false)
  const RouteProtector = ({children})=>{
    if(!auth){
      return(<Navigate to={'/login'} />)
    }
    else{
    return(children)}
  }
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
      <div className={` ${isBigScreen?"w-full flex justify-center  ":""}`}>
      <div className={`App ${isBigScreen?"max-w-2xl flex  ":""}`}>
        {!isBigScreen?
        <Routes>
          <Route index element={<RouteProtector><Feed/></RouteProtector>}/>
          <Route path='/search' element={<RouteProtector><Search/></RouteProtector>}/>
          <Route path='/home' element={<RouteProtector><Feed/></RouteProtector>}/>
          <Route path='/post/:postID' element={<PhotoPreview/>}/>
          <Route path='/add' element={<AddPost/>}/>
          <Route path='/chat' element={<Messages/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='home/messages' element={<MessageContainer/>}/> 
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/profile/:userID' element={<Profile/>}/>
          <Route path='/profile/:userID/followers' element={<FollowersList/>}/>
          <Route path='/profile/:userID/followings' element={<FollowingList/>}/>
          <Route path='/home/:id/comments' element={<Comments/>}/>
        </Routes>
        :
        
        <Routes>
          <Route path='/post/:postID' element={<PhotoPreview/>}/>
          <Route path='/home/:id/comments' element={<Comments/>}/>
          <Route index element={<FeedDesktop/>}/>
          <Route path='/add' element={<AddPost/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/messages' element={<MessageContainer/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/home/messages' element={<MessageContainer/>}/>
          <Route path='/home' element={<FeedDesktop/>}/>



          <Route path='/profile/:userID' element={<Profile/>}/>
          <Route path='/profile/:userID/followers' element={<FollowersList/>}/>
          <Route path='/profile/:userID/followings' element={<FollowingList/>}/>
          {/* <Route path='/home/' element={<MidFeed/>}>
            <Route index element={<Feed/>}/>
            <Route path='../home/profile/:userID' element={<Profile/>}/>

          </Route> */}

        </Routes>
}
       
        
      </div>
      </div>
    </Router>
    </appState.Provider>
  );
}

export default App;
export {appState}