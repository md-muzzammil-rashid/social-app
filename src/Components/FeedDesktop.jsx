import React from 'react'
import BottomNav from './BottomNav'
import Feed from './Feed'
import Chats from './Chats'
import { Outlet } from 'react-router-dom'
import MidFeed from './MidFeed'

const FeedDesktop = () => {
  return (
    <div className=' flex justify-center h-screen w-2xl '>
        <BottomNav/>
        <Feed/>

        

    </div>
  )
}

export default FeedDesktop