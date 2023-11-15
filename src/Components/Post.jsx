import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';import { pink } from '@mui/material/colors'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { UserContext } from './Context/UserContext';

const Post = ({e}) => {
    const {currentUser}=useContext(UserContext)
    const [totalLikes, setTotalLikes]=useState([])
    const [like,setLike]=useState(false)
    const getTotalLikes=async()=>{
        const q = query(collection(db,'post',`${e.id}/likes`))
        const unsub = onSnapshot(q,(ele)=>{
           let arrLike=[]
        ele.forEach((e)=>{arrLike.push(e.data())})
        setTotalLikes(arrLike)
        console.log(e.length) 
        })
        
    }
    const likeClickHandler =async()=>{
        
            if(currentUser.uid){

                if(!like){
                    addDoc(collection(db,'post',`${e.id}/likes`),{
                        userId: currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL
                    })
                    setLike(true)
                }
                if(like){
                    console.log('already llikes')
                    const q = query(collection(db,'post',`${e.id}/likes`),where('userId',"==",currentUser.uid))
                    const querSnaps = await getDocs(q)
                    querSnaps.forEach((l)=>{
                        deleteDoc(doc(db,'post',`${e.id}/likes/${l.id}`))
                        setLike(false)
                    })
                }
            }
        
    }
    const getLike=async()=>{
        const quer = query(collection(db,'post',`${e.id}/likes`),where("userId",'==',currentUser.uid))
        const querySnap = await getDocs(quer)
            querySnap.forEach((e)=>{
                if(e){
                    setLike(true)
                }
                else{
                    setLike(false)
                    console.log(like)
                }
            })
        
    }
    useEffect(()=>{
        getTotalLikes()
        getLike()
        console.log('h')
    },[like])
    return (
        <div>
            <div className='flex items-center '>
                <img loading='lazy' className='m-2 w-8 h-8 border-gray-200 border-1  rounded-full' src={e.photoURL} alt="" />
                <Link to={`/profile/${e.userId}`}><h3 className='font-bold text-sm'>{e.username}</h3></Link>
            </div>
            <div>
                <img loading='lazy' onDoubleClick={likeClickHandler} src={e.imageLink} alt="" />
            </div>
            <div className='flex justify-start my-2'>
                <ThumbUpRoundedIcon sx={{ color: pink[500] }} onClick={likeClickHandler} className='mx-6' />
                <Link to={`${e.id}/comments`}><ChatBubbleRoundedIcon sx={{ color: pink[500] }} className='mx-2' /></Link>
            </div>
            <div className='justify-start flex ml-2'>
                <span className='font-semibold'>{totalLikes.length} likes</span>
            </div>
            <div className=' justify-start text-start px-2'>
                <Link to={`/profile/${e.userId}`}><span className='font-semibold min-w-fit  float-left h-2'> {e.username} &nbsp;</span></Link> <p>
                    {e.desc}
                </p>
            </div>
            <div className='flex text-sm text-gray-600 px-2'>
                <Link to={`${e.id}/comments`}><span>View all {e.comments} comments...</span></Link>
            </div>
            <div className='flex text-sm text-gray-600 px-2'>
                <span>{new Date(e.timestamp).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default Post