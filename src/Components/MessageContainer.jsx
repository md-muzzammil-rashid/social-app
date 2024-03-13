import React from 'react'
import Input from './Input'
import MessageHeader from './MessageHeader'
import Messages from './Messages'
import { useParams } from 'react-router-dom'
import BottomNav from './BottomNav'

const MessageContainer = () => {
    const {userID}=useParams()
  return (
    <div className='relative h-full w-2xl'>
        <MessageHeader/>
        <Messages/>
        <Input userID={userID}/>
        <BottomNav/>
    </div>
  )
}

export default MessageContainer