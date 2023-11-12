import React, { useContext, useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import Input from './Input'
import BottomNav from './BottomNav'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { ChatContext } from './Context/ChatContext'
import { UserContext } from './Context/UserContext'

const Messages = () => {
  const {data}=useContext(ChatContext)
  const {currentUser}=useContext(UserContext)
  const {userID} = useParams()
  console.log(data)
  return (
    <div className='relative'>
      <MessageHeader/>
      <h2>{data.user.userInfo.displayName}</h2>
    < Input userID={userID} />

    </div>
  )
}

export default Messages