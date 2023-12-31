import React, { useState } from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { NavLink, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { useContext } from 'react';
import { appState } from '../App';
import { UserContext } from './Context/UserContext';

const BottomNav = () => {
    const { currentUser } = useContext(UserContext)
    const useAppState = useContext(appState)
    return (
        <div className='flex justify-between px-8 py-3 fixed bottom-0 w-screen md:max-h-screen md:left-0 md:flex-col md:w-64 md:justify-around md:items-start md:border-r  md:min-h-screen '>
            <NavLink to={'/home'} >
                <div className='flex justify-center font-bold items-center'>
                    <HomeRoundedIcon fontSize='large' />
                    <h2 className='hidden p-2 md:block'>Home</h2>
                </div>
            </NavLink>
            <NavLink to={'/search'} >
                <div className='flex justify-center font-bold items-center'>
                    <SearchOutlinedIcon fontSize='large' />
                    <h2 className='hidden p-2 md:block '>Search</h2>
                </div>
            </NavLink>
            <NavLink to={'/add'}>
                <div className='flex justify-center font-bold items-center'>
                    <AddOutlinedIcon fontSize='large' />
                    <h2 className='hidden md:block p-2 '>Home</h2>
                </div>
            </NavLink>
            <NavLink to={'/chats'}>
                <div className='flex justify-center font-bold items-center md:'>
                    <ChatBubbleOutlineOutlinedIcon fontSize='large' />
                    <h2 className='hidden md:block p-2 '>Chats</h2>
                </div>
            </NavLink>
            <NavLink to={`../profile/${currentUser.uid}`}>
                {useAppState.login ?
                    <div className='flex justify-center font-bold items-center md:'>

                        <img height={'32'} width={'32'} className='rounded-full' src={auth.currentUser.photoURL} alt="" />
                        <h2 className='hidden md:block p-2 '>Profile</h2>
                    </div>

                    :
                    <Navigate to={'/login'} />
                    // <AccountCircleOutlinedIcon fontSize='large' />
                }
            </NavLink>
        </div>
    )
}

export default BottomNav