import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, query, collection, where, getDocs, addDoc, deleteDoc, onSnapshot, documentId } from 'firebase/firestore'
import { db } from './firebase/firebase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from './BottomNav'
import { ChatContext } from './Context/ChatContext'
import { UserContext } from './Context/UserContext'
import { getAuth, signOut } from 'firebase/auth';

const Profile = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)
  const auth=getAuth()
  const { userID } = useParams()
  const [data, setData] = useState({})
  const { dispatch } = useContext(ChatContext)
  const [post, setPost] = useState([])
  const [follow, setFollow] = useState(null)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const followClickHandler = async () => {
    if (!follow) {
      await setDoc(doc(db, "userDB" , `${currentUser.uid}/followings`,userID), {
        uid: data.uid,
        photoURL: data.photoURL,
        displayName: data.displayName
      })

      await setDoc(doc(db, "userDB" , `${userID}/followers`,currentUser.uid), {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName
      }).then(setFollow(true),
      getFollowStatus())

      // console.log('data added')
    }
    if(follow)
    {
      await deleteDoc(doc(db,`userDB/${currentUser.uid}/followings`,userID))
      await deleteDoc(doc(db,`userDB/${userID}/followers`,currentUser.uid)).then(setFollow(false),getFollowStatus())
    }
  }

  const getFollowStatus = async ()=>{
    const q = await getDoc(doc(db,`userDB/${currentUser.uid}/followings`, userID))
    if(q.exists()){
      setFollow(true)
      // console.log('followed')
    }
    else{
      setFollow(false)
      // console.log('not folloowied')
    }
    let followerArr=[];
    let followingArr=[];
    const followersCount = await getDocs(query(collection(db,`userDB/${userID}/followers`)))
    followersCount.forEach((elem)=>{
      followerArr.push(elem.data())
    })
    setFollowers(followerArr)

    // console.log(followers)
    const followingCount = await getDocs(query(collection(db,`userDB/${userID}/followings`)))
    followingCount.forEach((elem)=>{
      followingArr.push(elem.data())
    })    
    setFollowing(followingArr)
    // console.log(following)
  }

  const messageClickHandler = async () => {
    const combinedID = currentUser.uid > data.uid ? currentUser.uid + "COM" + data.uid : data.uid + "COM" + currentUser.uid;
    const res = await getDoc(doc(db, 'chats', combinedID))
    if (!res.exists()) {
      await setDoc(doc(db, 'chats', combinedID), { message: [] })
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [combinedID + '.userInfo']: {
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL
        },
        [combinedID + '.date']: serverTimestamp()
      }).then(

        await updateDoc(doc(db, 'userChats', data.uid), {
          [combinedID + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedID + '.date']: serverTimestamp()
        })
      )
    }
    
    const q = getDoc(doc(db,`userChats/${currentUser.uid}`, combinedID))
    console.log(q)
    // dispatch({
    //         type:"CHANGE_USER",
    //         payload:doc.data()
    //       })
    //       navigate('/messages')
    // })
    
  }

  const getPost = async () => {
    const q = query(collection(db, 'post'), where("userId", '==', userID))
    const querySnap = await getDocs(q)
    let _post = []
    querySnap.forEach((e) => { _post.push([e.data(), e.id]) })
    setPost(_post)
  }

  useEffect(() => {
    getPost()
    const getData = async () => {
      const _data = await getDoc(doc(db, 'userDB', userID))
      setData(_data.data())
    }
    getData()
    getFollowStatus()
  }, [follow,auth])
  return (
    userID==currentUser.uid?
    <>
      <div className='flex w-full fixed top-0 items-center '>
        <button onClick={() => { navigate(-1) }} ><ArrowBackIcon className='m-3' /></button>
        <h2 className='ml-1 text-lg font-bold text-white'>{data.displayName} </h2>
      </div>
      <div className='flex mt-12 '>
        <div className='m-4'>
          <img className='rounded-full ' height={'100'} width={'100'} src={data.photoURL} alt="" />
        </div>
        <div className='flex w-full justify-around p-1 items-center flex-wrap'>

          <div>
            <h1 className='font-bold text-lg'>{post.length}</h1>
            Post
          </div>
          <Link to={`../profile/${userID}/followers`}>
          <div>
            <h1 className='font-bold text-lg'>{followers.length}</h1>
            Followers
          </div>
          </Link>
          <Link to={`../profile/${userID}/followings`}>
          <div>
            <h1 className='font-bold text-lg'>{following.length}</h1>
            Following
          </div>
          </Link>
        </div>
      </div>
      <div className='p-2 pl-4 pt-0'>
        <h2 className='flex font-bold'>{data.displayName}</h2>
        <p className='flex'>{data.bio}</p>
      </div>
        {/* buttons  */}
      <div className='w-full'>

            <button className='bg-blue-600 p-1 px-14 mr-2 rounded-lg w-5/12' onClick={()=>signOut(auth).then(navigate('/login'))}> LOGOUT </button>



        <button onClick={messageClickHandler} className='bg-zinc-900 p-1 px-12 ml-2 rounded-lg w-5/12'> Message </button>
      </div>
      {/* div for photos */}
      <div className='mt-16 flex flex-wrap'>
        {post.map((e, i) => {
          return (
            <div style={{ padding: "1px" }} className='w-1/3 aspect-square overflow-hidden object-cover  '>
              <Link to={`../post/${e[1]}`}>
                <img className='object-cover min-w-full min-h-full items-center' src={e[0].imageLink} alt="" />
              </Link>
            </div>
          )
        })}
      </div>
      <BottomNav />

    </>
    :
    <>
      <div className='flex w-full fixed top-0 items-center '>
        <button onClick={() => { navigate(-1) }} ><ArrowBackIcon className='m-3' /></button>
        <h2 className='ml-1 text-lg font-bold text-white'>{data.displayName}</h2>
      </div>
      <div className='flex mt-12 '>
        <div className='m-4'>
          <img className='rounded-full ' height={'100'} width={'100'} src={data.photoURL} alt="" />
        </div>
        <div className='flex w-full justify-around p-1 items-center flex-wrap'>

          <div>
            <h1 className='font-bold text-lg'>{post.length}</h1>
            Post
          </div>
          <Link to={`../profile/${userID}/followers`}>
          <div>
            <h1 className='font-bold text-lg'>{followers.length}</h1>
            Followers
          </div>
          </Link>
          <Link to={`../profile/${userID}/followings`}>
          <div>
            <h1 className='font-bold text-lg'>{following.length}</h1>
            Following
          </div>
          </Link>
        </div>
      </div>
      <div className='p-2 pl-4 pt-0'>
        <h2 className='flex font-bold'>{data.displayName}</h2>
        <p className='flex'>{data.bio}</p>
      </div>
        {/* buttons  */}
      <div className='w-full'>
        {


          follow ?
            <button className='bg-zinc-900 p-1 px-14 mr-2 rounded-lg w-5/12' onClick={followClickHandler}> Following </button>
            :
            <button className='bg-blue-600 p-1 px-14 mr-2 rounded-lg w-5/12' onClick={followClickHandler}> Follow </button>

        }

        <button onClick={messageClickHandler} className='bg-zinc-900 p-1 px-12 ml-2 rounded-lg w-5/12'> Message </button>
      </div>
      {/* div for photos */}
      <div className='mt-16 flex flex-wrap'>
        {post.map((e, i) => {
          return (
            <div style={{ padding: "1px" }} className='w-1/3 aspect-square overflow-hidden object-cover  '>
              <Link to={`../post/${e[1]}`}>
                <img className='object-cover min-w-full min-h-full items-center' src={e[0].imageLink} alt="" />
              </Link>
            </div>
          )
        })}
      </div>
      <BottomNav />

    </>
  )
}

export default Profile