import React from 'react'
import Input from './Input'
import MessageHeader from './MessageHeader'
import Messages from './Messages'
import { useParams } from 'react-router-dom'

const MessageContainer = () => {
    const {userID}=useParams()
  return (
    <div className='relative h-full md:w-2/6 md:fixed md:right-0 md:border-l'>
        <MessageHeader/>
        <Messages/>
        <Input userID={userID}/>
    </div>
  )
}

export default MessageContainer