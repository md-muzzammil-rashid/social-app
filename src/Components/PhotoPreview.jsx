import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from './firebase/firebase'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import BottomNav from './BottomNav'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded'


const PhotoPreview = () => {
    const { postID } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        const getPost = async () => {
            setPost((await getDoc(doc(db, "post", postID))).data())
        }
        getPost()
        console.log(post)
    }, [])

    return (
        <div className='w-full pt-1'>

                <div className='flex items-center '>
                    <img loading='lazy' className='m-2 w-8 h-8 border-gray-200 border-1  rounded-full' src={post.photoURL} alt="" />
                    <Link to={`/profile/${post.userId}`}><h3 className='font-bold text-sm'>{post.username}</h3></Link>
                </div>

                <div className='min-w-screen flex flex-col max-h-screen items-center'>
                    <img src={post.imageLink} alt="" />
                </div>

                <div className='flex justify-start my-2'>
                    <ThumbUpRoundedIcon className='mx-6' />
                    <Link to={`../../home/${postID}/comments`}><ChatBubbleRoundedIcon className='mx-2' /></Link>
                </div>
                <div className='justify-start flex ml-2'>
                    <span className='font-semibold'>{post.likes} likes</span>
                </div>
                <div className=' justify-start text-start px-2'>
                    <Link to={`/profile/${post.userId}`}><span className='font-semibold min-w-fit  float-left h-2'> {post.username} &nbsp;</span></Link> <p>
                        {post.desc}
                    </p>
                </div>
                <div className='flex text-sm text-gray-600 px-2'>
                    <Link to={`../home/${postID}/comments`}><span>View all {post.comments} comments...</span></Link>
                </div>
                <div className='flex text-sm text-gray-600 px-2'>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
                <BottomNav />


        </div>
    )
}

export default PhotoPreview