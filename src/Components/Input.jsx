import React, { useContext, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { UserContext } from './Context/UserContext';

const Input = ({userID,user}) => {
  const {currentUser}=useContext(UserContext)
  const [message, setMessage]=useState('')
  const sendButtonHandler =async ()=>{
    const combinedID = currentUser.uid > user.uid ? currentUser.uid+"COM"+user.uid : user.uid+"COM"+currentUser.uid;
    const res = await getDoc(doc(db, 'chats' ,combinedID))
    if(!res.exists()){
      await setDoc(doc(db,'chats',combinedID),{message:[]})
      await updateDoc(doc(db, 'userChats', currentUser.uid),{
        [combinedID+'.userInfo']:{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        },
        [combinedID+'.date']:serverTimestamp()
    }).then(

        await updateDoc(doc(db, 'userChats', user.uid),{
            [combinedID+'.userInfo']:{
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            [combinedID+'.date']:serverTimestamp()
        })
        )
    }

    setMessage('')

  }
  return (
    <div className='fixed box-border px-2 bottom-0 w-full' >
      <input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Message...' className='border rounded-full w-full px-5 pr-10  my-2 box-border   py-2 ' type="text" />
      <SendIcon onClick={sendButtonHandler} className='fixed right-4 bottom-4'/>
    </div>
  )
}

export default Input