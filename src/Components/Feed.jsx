import React, { useContext, useEffect, useState } from 'react'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { getDocs } from 'firebase/firestore';
import { postRef } from './firebase/firebase';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { appState } from '../App';
import Login from './Login';
import BottomNav from './BottomNav';
import { pink } from '@mui/material/colors';
import Post from './Post';

const Feed = () => {
    const useAppState = useContext(appState)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const _data = await getDocs(postRef);
            _data.forEach((element) => {
                setData((prevData) => [...prevData, { ...element.data(), id: element.id }])
            })
            setLoading(false)
        }
        setLoading(true)
        getData();
    }, [])

    return (


        <div className='mb-16 w-2xl md:mb-0 md:items-center md:box-border  h-screen overflow-scroll md:w-full md:flex md:flex-col md:fixed md:max-h-screen md:overflow-scroll md:justify-center'>
            {loading ?
                <div className='w-full flex justify-center h-screen items-center'>
                    <ThreeDots />
                </div> :
                data.map((e, i) => {
                    return (
                        <>
                        <Post e={e}/>
                        
                            <BottomNav/>

                        </>
                    )
                })
            }


        </div>



    )
}

export default Feed