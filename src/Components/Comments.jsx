import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {collection, getDocs, addDoc, updateDoc, doc, increment} from 'firebase/firestore'
import { db } from './firebase/firebase'

const Comments = () => {
    const {id}=useParams();
    const [formData, setFormData]=useState({
        comment:'',
        username:'zammi'
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
            const _data = await getDocs(collection(db,`/post/${id}/comments/`));
            _data.forEach(element=>{
                setData((prevData)=>[...prevData, {...element.data()}])
            })
        }
        
        getData();
    },[newAdded])
  return (
    <div>

    <div>Comments</div>
    <h2>{id}</h2>
    {data.map((e,i)=>{
        return(
            <div className='flex w-11/12 bg-slate-950 border m-4 p-2 rounded-xl flex-col justify-center'>
                <h2 className='bg-slate-950 font-extrabold text-start'>{e.username}</h2>
                <h2 className='bg-slate-950  text-start'>{e.comment}</h2>
            </div>
        )
    })}
    <div className='flex w-full fixed bottom-0 mb-14 flex-col justify-center  '>
        <input onChange={(e)=>{setFormData({...formData, comment: e.target.value})}}  placeholder='Add a comment...' className=' px-4 bg-gray-900  h-10' type="text" />
        <button onClick={AddComment} className='bg-blue-500 h-10 w-full  '>Comment</button>
    </div>
    </div>
  )
}

export default Comments