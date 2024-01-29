import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {collection, getDocs, addDoc, updateDoc, doc, increment} from 'firebase/firestore'
import { db } from './firebase/firebase'
import BottomNav from './BottomNav'
import { UserContext } from './Context/UserContext'

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
    <div>
    {data.map((e,i)=>{
        return(
            <div className='flex w-full items-center '>
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
    <div className='flex w-full fixed bottom-0 mb-14 flex-col justify-center  '>
        <input onChange={(e)=>{setFormData({...formData, comment: e.target.value})}}  placeholder='Add a comment...' className=' px-4 bg-gray-900  h-10' type="text" />
        <button onClick={AddComment} className='bg-blue-500 h-10 w-full  '>Comment</button>
    </div>
    <BottomNav/>
    </div>
  )
}

export default Comments