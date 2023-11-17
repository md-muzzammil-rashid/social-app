import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from './firebase/firebase'

const FollowersList = () => {
    const {userID}=useParams()
    const [followers, setFollowers]=useState([])

    const getFollowers=async()=>{
        const snapShot = await getDocs(collection(db,'userDB',`${userID}/followers`))
        let arr=[];
        snapShot.forEach((e)=>{
            arr.push(e.data())
        })
        setFollowers(arr)
        console.log(followers)
    }
    useEffect(()=>{
        getFollowers()
    },[])
  return (
    <div>
         {followers.map((e,i)=>{
          
            return(
              <Link to={`../profile/${e.uid}`}>
              <div className='flex items-center p-1'>
                <img src={e.photoURL} width={50} className='rounded-full m-2' alt="" />
              <h2 className='p-2'>{e.displayName}</h2>
              </div>
              </Link>
              )
            
        })}
    </div>

  )
}

export default FollowersList