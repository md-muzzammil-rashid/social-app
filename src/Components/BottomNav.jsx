import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { NavLink } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { useContext } from 'react';
import { appState } from '../App';

const BottomNav = () => {
    const useAppState = useContext(appState)
    return (
        <div className='flex justify-between px-8 py-3 fixed bottom-0 w-screen'>
            <NavLink to={'/home'} >
                <HomeRoundedIcon fontSize='large' />
            </NavLink>
            <NavLink to={'/search'} >
                <SearchOutlinedIcon fontSize='large' />
            </NavLink>
            <NavLink to={'/add'}>
                <AddOutlinedIcon fontSize='large' />
            </NavLink>
            <NavLink to={'/chats'}>
                <ChatBubbleOutlineOutlinedIcon fontSize='large' />
            </NavLink>
            <NavLink to={'/myprofile'}>
                {useAppState.login ?
                    <img height={'32'} width={'32'} className='rounded-full' src={auth.currentUser.photoURL} alt="" />
                    :
                    <AccountCircleOutlinedIcon fontSize='large' />
                }
            </NavLink>
        </div>
    )
}

export default BottomNav