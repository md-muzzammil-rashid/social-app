import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';import { pink } from '@mui/material/colors'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { SvgIcon } from '@mui/material';
import { UserContext } from './Context/UserContext';
import HeartIcon from './HeartIcon';

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
        <div className='flex flex-col max-w-sm justify-center w-screenʼ ' >
            <div className='flex items-center  '>
                <img loading='lazy' className='m-2 w-8 h-8 border-gray-200 border-1  rounded-full' src={e.photoURL} alt="" />
                <Link to={`/profile/${e.userId}`}><h3 className='font-bold text-sm'>{e.username}</h3></Link>
            </div>
            <div className='relative w-screen'>
                <img loading='lazy' onDoubleClick={likeClickHandler} src={e.imageLink} className=' w-screen md:w-9 ' alt="" />
            </div>
            <div className='flex justify-start my-2'>
                {!like?
                <SvgIcon onClick={likeClickHandler} className='mx-6' >
                <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                </SvgIcon  > :
                <SvgIcon onClick={likeClickHandler} className='mx-6' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill='red' height="1em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                </SvgIcon>
            }
                
                <Link to={`../home/${e.id}/comments`}><SvgIcon sx={{ color: "red" }} className='mx-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
                    </SvgIcon></Link>
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
                <Link to={`../home/${e.id}/comments`}><span>View all {e.comments} comments...</span></Link>
            </div>
            <div className='flex text-sm text-gray-600 px-2'>
                <span>{new Date(e.timestamp).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default Post