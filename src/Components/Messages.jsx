import React, { useContext, useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import Input from './Input'
import BottomNav from './BottomNav'
import { useParams } from 'react-router-dom'
import { db } from './firebase/firebase'
import { ChatContext } from './Context/ChatContext'
import { UserContext } from './Context/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'

const Messages = () => {
  const {data}=useContext(ChatContext)
  const [messages, setMessages]=useState([])
  const {currentUser}=useContext(UserContext)
  const {userID} = useParams()
  useEffect(()=>{
    onSnapshot(doc(db, 'chats', data.chatID),(doc)=>{
      doc.exists() && setMessages(doc.data().message)
    })
  },[])
  return (
    <div className='relative pb-14 overflow-scroll max-h-screen pb-32 mt-16 md:'>
      {/* <MessageHeader/> */}
      {messages?.map((e,i)=>{
        if(e.senderID == currentUser.uid){
          return(
            <div key={i} className='flex items-center m-3 flex-row-reverse'>
      <span className='bg-blue-600 px-4  py-2 ml-2 rounded-full'>{e.message}</span>
    </div>
          )
        }
        else{

          return(
            
            <div key={i} className='flex items-center m-3'>
      <img src={data.user.userInfo.photoURL}  className='rounded-full h-8' alt="" />
      <span className='bg-gray-900 px-4 py-2 ml-2 rounded-full'>{e.message}</span>
    </div>
          )
        }
      })}

    {/* < Input userID={userID} /> */}

    </div>
  )
}

export default Messages