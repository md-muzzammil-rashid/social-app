import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './Context/UserContext'
import BottomNav from './BottomNav'
import { doc, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChatContext } from './Context/ChatContext'

const Chats = () => {
    const { currentUser } = useContext(UserContext)
    const [data, setData] = useState([])
    let dataArr = []
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { dispatch } = useContext(ChatContext)
    const navigate = useNavigate()
    const clickHandler = (user) => {
        dispatch({ type: 'CHANGE_USER', payload: user })
        navigate('/messages')
    }


    useEffect(() => {
        const getData = () => {

            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (document) => {
                // console.table(document.data())
                setData(document.data())
            })
            return () => unsub
        }
        Object.entries(data).forEach((e) => { dataArr.push(e[1]); })
        // setSearchResult(dataArr.filter(a=>a.userInfo.displayName.toLowerCase().includes(search.toLowerCase())))
        setSearchResult(dataArr.filter((e) => e.userInfo.displayName.toLowerCase().trim().includes(search.toLowerCase().trim())))
        console.log(dataArr[0])
        currentUser.uid && getData()
    }, [currentUser.uid, search])
    return (
        <>
            <div className='flex w-full justify-center items-center p-4 box-border ' >
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='bg-zinc-800 rounded-lg w-full p-2 px-4 border-0 ' />
            </div>
            <div>
                {search == '' ?


                    Object.entries(data).map((e, i) => {
                        const user = e[1]
                        if (user.lastMessageSenderId == currentUser.uid) {

                            return (
                                <div key={i} className='flex' onClick={() => { clickHandler(user); setSearch('') }} >
                                    <div className='p-2'><img className='rounded-full ' width={50} src={user.userInfo.photoURL} alt="" /></div>
                                    <div className='p-2 justify-start flex flex-col text-start'>
                                        <h2 className='font-bold'>{user.userInfo.displayName}</h2>
                                        <h2>You : {user.lastMessage}</h2>
                                    </div>
                                </div>
                            )
                        }
                        else {

                            return (
                                <div key={i} className='flex' onClick={() => clickHandler(user)} >
                                    <div className='p-2'><img className='rounded-full ' width={50} src={user.userInfo.photoURL} alt="" /></div>
                                    <div className='p-2 justify-start flex flex-col text-start'>
                                        <h2 className='font-bold'>{user.userInfo.displayName}</h2>
                                        <h2>{user.lastMessage}</h2>
                                    </div>
                                </div>
                            )
                        }
                    })
                    :
                    searchResult.map((e, i) => {
                        
                            if (e.lastMessageSenderId == currentUser.uid) {

                                return (
                                    <div key={i} className='flex' onClick={() => { clickHandler(e); setSearch('') }} >
                                        <div className='p-2'><img className='rounded-full ' width={50} src={e.userInfo.photoURL} alt="" /></div>
                                        <div className='p-2 justify-start flex flex-col text-start'>
                                            <h2 className='font-bold'>{e.userInfo.displayName}</h2>
                                            <h2>You : {e.lastMessage}</h2>
                                        </div>
                                    </div>
                                )
                            }
                            else {
    
                                return (
                                    <div key={i} className='flex' onClick={() => clickHandler(e)} >
                                        <div className='p-2'><img className='rounded-full ' width={50} src={e.userInfo.photoURL} alt="" /></div>
                                        <div className='p-2 justify-start flex flex-col text-start'>
                                            <h2 className='font-bold'>{e.userInfo.displayName}</h2>
                                            <h2>{e.lastMessage}</h2>
                                        </div>
                                    </div>
                                )
                            }
                            

                    })

                }




            </div>
            <BottomNav />
        </>
    )
}

export default Chats