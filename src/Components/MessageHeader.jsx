import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from './Context/ChatContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const MessageHeader = () => {
  const navigate = useNavigate()
  const {data}=useContext(ChatContext)
  return (
    <div className=' flex items-center fixed top-0 w-screen z-10'>

      <button className='ml-3' onClick={()=>navigate(-1)}><ArrowBackIcon/></button>
      <img width={40} className='rounded-full m-3' src={data.user.userInfo.photoURL} alt="" />
      <h2 className='font-bold'>{data.user.userInfo.displayName}</h2>
    </div>
  )
}

export default MessageHeader