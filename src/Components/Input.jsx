import React, { useContext, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Timestamp, arrayUnion,  doc,  serverTimestamp,  updateDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { UserContext } from './Context/UserContext';
import { v4 as uuid } from 'uuid';
import { ChatContext } from './Context/ChatContext';

const Input = () => {
  const { currentUser } = useContext(UserContext)
  const { data } = useContext(ChatContext)
  const [message, setMessage] = useState('')
  const keyHandler = (k)=>{
    if(k.keyCode==13)
    {
      sendButtonHandler()
    }
    // else{
    //   console.log("not ENrwer",k)
    // }

  }
  const sendButtonHandler = async () => {
    if (!message == '') {
      await updateDoc(doc(db, 'chats', data.chatID), {
        message: arrayUnion({
          id: uuid(),
          message:message,
          senderID: currentUser.uid,
          date: Timestamp.now()
        })
      }).then(setMessage(''))
      await updateDoc(doc(db,'userChats',currentUser.uid),{
        [data.chatID+".lastMessage"]:message,
        [data.chatID+".lastMessageSenderId"]:currentUser.uid,
        [data.chatID+".date"]:serverTimestamp(),
      })
      await updateDoc(doc(db, 'userChats', data.user.userInfo.uid),{
        [data.chatID+".lastMessage"]:message,
        [data.chatID+".lastMessageSenderId"]:currentUser.uid,
        [data.chatID+".date"]:serverTimestamp(),
      })
        
      
    }
    console.log(data.chatID)
  }





  return (
    <div className='fixed box-border px-2 w-full bottom-0 mb-16 md:mb-0 w-2xl' >
      <input onKeyUp={(k)=>keyHandler(k)} value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Message...' className='border rounded-full w-full px-5 pr-10  my-2 box-border    py-2 ' type="text" />
      <SendIcon onClick={sendButtonHandler} className='absolute right-4 bottom-4' />
    </div>
  )
}

export default Input