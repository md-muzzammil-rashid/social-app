import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './Context/UserContext'
import BottomNav from './BottomNav'
import { doc, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChatContext } from './Context/ChatContext'

const Chats = () => {
    const {currentUser}= useContext(UserContext)
    const [data, setData]=useState([])
    const {dispatch}=useContext(ChatContext)
    const navigate= useNavigate()
    const clickHandler = (user) =>{
        dispatch({type:'CHANGE_USER', payload:user})
        navigate('/messages')
    }


    useEffect(()=>{
        const getData=()=>{
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid),(document)=>{
                setData(document.data())
            })
            return ()=>unsub
        }
        currentUser.uid && getData()
    },[currentUser.uid])
  return (
    <>
    <div>
{Object.entries(data).map((e,i)=>{
    const user = e[1]
    return(
        <div className='flex' onClick={()=>clickHandler(user)} >
            <div className='p-2'><img className='rounded-full '  width={50} src={user.userInfo.photoURL} alt="" /></div>
            <div className='p-2 justify-start flex flex-col text-start'>
                <h2 className='font-bold'>{user.userInfo.displayName}</h2>
                <h2>{user.lastMessage}</h2>
            </div>
        </div>
         )
})}
       

        
    </div>
    <BottomNav/>
     </>
  )
}

export default Chats