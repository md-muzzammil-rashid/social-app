import React, { useEffect, useState } from 'react'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { getDocs } from 'firebase/firestore';
import { postRef } from './firebase/firebase';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const Feed = () => {
    const [loading, setLoading]=useState(true)
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getData =async () =>{
           const _data =  await getDocs(postRef);
           _data.forEach((element)=>{
            setData((prevData)=>[...prevData,{ ...element.data(), id:element.id}])
           })
        }
        setLoading(true)
        getData();
        setLoading(false)
    },[])

    return (
        <>
        <div className='mb-16'>
            {loading?
            <div className='w-full flex justify-center h-screen items-center'>
                <ThreeDots/>
            </div>:
                data.map((e,i)=>{
                    return(
                        <>
                        <div className='flex items-center '>
                <img loading='lazy'  className='m-2 w-8 h-8 border-gray-200 border-1  rounded-full' src="https://www.hollywoodreporter.com/wp-content/uploads/2015/06/johnny_depp_dior.jpg" alt="" />
                <h3 className='font-bold text-sm'>{e.userId}</h3>
            </div>
            <div>
                <img loading='lazy' src={e.imageLink} alt="" />
            </div>
            <div className='flex justify-start my-2'>
                <ThumbUpRoundedIcon className='mx-6'  />
                <Link to={`${e.id}/comments`}><ChatBubbleRoundedIcon  className='mx-2' /></Link>
            </div>
            <div className='justify-start flex ml-2'>
                <span className='font-semibold'>{e.likes} likes</span>
            </div>
            <div className=' justify-start text-start px-2'>
               <span className='font-semibold min-w-fit  float-left h-2'> {e.username} &nbsp;</span> <p>
                {e.desc}
                </p> 
            </div>
            <div className='flex text-sm text-gray-600 px-2'>
                <Link to={`${e.id}/comments`}><span>View all {e.comments} comments...</span></Link>
            </div>
            <div className='flex text-sm text-gray-600 px-2'>
                <span>{new Date(e.timestamp).toLocaleDateString()}</span>
            </div>
                        </>
                    )
                })
            }
            
            
        </div>
        </>

    )
}

export default Feed