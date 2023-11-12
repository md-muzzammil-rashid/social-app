import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase/firebase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from './BottomNav'
import { ChatContext } from './Context/ChatContext'
import { UserContext } from './Context/UserContext'

const Profile = () => {
  const navigate = useNavigate()
  const {currentUser}=useContext(UserContext)
  const {userID} = useParams()
  const [data, setData]=useState({})
  const {dispatch}=useContext(ChatContext)
  
  const messageClickHandler = async()=>{
    const combinedID = currentUser.uid > data.uid ? currentUser.uid+"COM"+data.uid : data.uid+"COM"+currentUser.uid;
    const res = await getDoc(doc(db, 'chats' ,combinedID))
    if(!res.exists()){
      await setDoc(doc(db,'chats',combinedID),{message:[]})
      await updateDoc(doc(db, 'userChats', currentUser.uid),{
        [combinedID+'.userInfo']:{
            uid: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL
        },
        [combinedID+'.date']:serverTimestamp()
    }).then(

        await updateDoc(doc(db, 'userChats', data.uid),{
            [combinedID+'.userInfo']:{
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            [combinedID+'.date']:serverTimestamp()
        })
        )
    }
    const userChatData = await getDoc(doc(db,'userChats',combinedID))
    dispatch({
      type:"CHANGE_USER",
      payload:userChatData

    })
  }

  useEffect(()=>{
    const getData = async() => {
      const _data =await getDoc(doc(db, 'userDB', userID))
      setData(_data.data())
    }
    console.log('getdata called')
    getData()
  },[])
  return (
    <>
  <div className='flex items-center '>
    <button onClick={()=>{navigate(-1)}} ><ArrowBackIcon className='m-3' /></button>
    <h2 className='ml-1 text-lg'>{data.username}</h2>
  </div>
<div className='flex '>
  <div className='m-4'>
    <img className='rounded-full ' height={'100'} width={'100'} src={data.photoURL} alt="" />
  </div>
  <div className='flex w-full justify-around p-1 items-center flex-wrap'>

  <div>
    <h1 className='font-bold text-lg'>82</h1>
    Post
  </div>
  <div>
    <h1 className='font-bold text-lg'>421</h1>
    Followers
  </div>
  <div>
    <h1 className='font-bold text-lg'>182</h1>
    Following
  </div>
  </div>
</div>
    <div className='p-2 pl-4 pt-0'>
      <h2 className='flex font-bold'>{data.displayName}</h2>
      <p className='flex'>{data.bio}</p>
    </div>
    <div className='w-full'> 
      <button  className='bg-blue-600 p-1 px-14 mr-2 rounded-lg w-5/12'> Follow </button>
      <button onClick={messageClickHandler} className='bg-zinc-900 p-1 px-12 ml-2 rounded-lg w-5/12'> Message </button>
    </div>
    <BottomNav/>

    </>
    )
}

export default Profile