import React from 'react'
import Input from './Input'
import MessageHeader from './MessageHeader'
import Messages from './Messages'
import { useParams } from 'react-router-dom'

const MessageContainer = () => {
    const {userID}=useParams()
  return (
    <div className='relative'>
        <MessageHeader/>
        <Messages/>
        <Input userID={userID}/>
    </div>
  )
}

export default MessageContainer