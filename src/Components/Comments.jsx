import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {collection, getDocs, addDoc, updateDoc, doc, increment} from 'firebase/firestore'
import { db } from './firebase/firebase'
import BottomNav from './BottomNav'
import { UserContext } from './Context/UserContext'
import SendIcon from '@mui/icons-material/Send';


const Comments = () => {
    const {id}=useParams();
    const {currentUser} =useContext(UserContext)
    const [formData, setFormData]=useState({
        comment:'',
        username: currentUser.displayName,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid
    })
    const [data, setData]=useState([])
    const [newAdded, setNewAdded]=useState(0)
    function AddComment(){
        addDoc(collection(db, `post/${id}/comments`),formData)
        const docRef = doc(db, 'post', `${id}`)
        updateDoc(docRef,{comments: increment(1) })
        setNewAdded(newAdded+1)
        setFormData((prev)=>({...prev, comment:""}))
    }
    useEffect(()=>{
        async function getData(){
            setData([])
            const _data = await getDocs(collection(db,`/post/${id}/comments/`));
            _data.forEach(element=>{
                setData((prevData)=>[...prevData, {...element.data()}])
            })
        }
        
        getData();
    },[newAdded])
  return (
    <div className='w-2xl'>
    {data.map((e,i)=>{
        return(
            <div key={e.photoURL} className='flex w-full items-center '>
                <div className='w-14 m-2'>
                    <Link to={`../profile/${e.uid}`}>
                <img  className='rounded-full h-12 aspect-square' src={e.photoURL} alt="" />
                    </Link>
                </div>
            <div className='flex w-11/12 bg-slate-950  p-2 rounded-xl flex-col justify-center'>
                <Link to={`../profile/${e.uid}`}>
                <h2 className='bg-slate-950 font-extrabold text-start'>{e.username}</h2>
                </Link>
                <h2 className='bg-slate-950  text-start'>{e.comment}</h2>
            </div>
            </div>
        )
    })}
    {/* <div className='flex w-full fixed bottom-0 mb-14 md:mb-0 flex-col max-w-2xl justify-center  '>
        <input onChange={(e)=>{setFormData({...formData, comment: e.target.value})}}  placeholder='Add a comment...' className=' px-4 bg-gray-900  h-10' type="text" />
        <button onClick={AddComment} className='bg-blue-500 h-10 w-full  '>Comment</button>
    </div> */}
        <div className='fixed box-border px-2 w-full bottom-0 w-2xl' >
      <input value={formData.comment} onChange={(e)=>{setFormData((prev)=>({...prev, comment: e.target.value})); }}  placeholder='Add a comment...' className='border rounded-full w-full px-5 pr-10  my-2 box-border    py-2 ' type="text" />
      <SendIcon onClick={AddComment} className='absolute right-4 bottom-4' />
    </div>
    <BottomNav/>
    </div>
  )
}

export default Comments