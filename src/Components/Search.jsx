import React, { useEffect, useState } from 'react'
import BottomNav from './BottomNav'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { Link } from 'react-router-dom'
import { Chat } from '@mui/icons-material'
import Chats from './Chats'

const Search = () => {
  const [search, setSearch]=useState('')
  const [searchResult, setSearchResult]=useState([])
  const [users, setUsers]= useState([])

  const getUser=async()=>{
        let usersArr = []
        const userSnapShot =await getDocs(collection(db,"userDB"))
        userSnapShot.forEach((e,i)=>{usersArr.push(e.data())})
        setUsers(usersArr)
      }

  useEffect(()=>{

      setSearchResult(users.filter(u=>u.displayName.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())))
      getUser()

  },[search])

  return (
    <div className='md:flex'>
    <div className='md:ml-64 md:w-2/3 search-res md:box-border md:mr-80 w-full'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" name="" id="" placeholder='Search...' className='border-red-50 rounded border m-3 p-2 rounded-s h-10 w-11/12 ' />
        {searchResult.map((e,i)=>{
          if(!search=="")
          {
            return(
              <Link to={`../profile/${e.uid}`}>
              <div className='flex items-center p-1'>
                <img src={e.photoURL} width={50} className='rounded-full m-2' alt="" />
              <h2 className='p-2'>{e.displayName}</h2>
              </div>
              </Link>
              )
            }
        })}
    </div>
    <BottomNav/> 
    <div >
       <Chats  />
    </div>
    </div>
  )
}

export default Search