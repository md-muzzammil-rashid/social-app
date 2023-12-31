import React, { useEffect, useState } from 'react'
import { postRef, db, auth} from './firebase/firebase'
import { getAuth } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { v4 } from 'uuid'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { cloudDB } from './firebase/firebase'
import { TailSpin } from 'react-loader-spinner'
import { Navigate, useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'

const AddPost = () => {
  const navigate = useNavigate();
  let [image, setImage] = useState()
  const [imageLink, setImageLink] = useState()
  const [uploadImgLoader, setUploadImgLoader]=useState(false)
  const [uploadDataLoader, setUploadDataLoader]=useState(false)
  const [form, setForm] = useState({
      image : '',
      desc : '',
      username : '',
      comments:0,
      imageLink:'',
      userId:'',
      likes:0,
      photoURL:'',
      timestamp:new Date().getTime()
  })
 
  const imageHandler =async (e)=>{
    setUploadImgLoader(true)
    setImage(e.target.files[0]);
    const imgs = ref(cloudDB,`images/${v4()}`);
    await uploadBytes(imgs, e.target.files[0]).then((data=>getDownloadURL(data.ref).then((val)=>setForm({...form, imageLink:val}))))
    setUploadImgLoader(false)
  }
 
  const setFormData = async () => {
    
    await addDoc(postRef,form)
    navigate('/home')
     
  }

  useEffect(()=>{

      },[image])

      return (
        <div className='res-des'>
        <h2 className='text-xl font-bold'>Add Post</h2>
        {getAuth().currentUser?
        <div className='flex flex-col'>
          {image?
          <div className='m-5'>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
            :
            <p></p>
          }
      <input required accept='image/*' className='m-4' type="file" onChange={(e)=>imageHandler(e)}/>
      <textarea required rows='4' cols='10' placeholder='Write a caption...' className='flex flex-wrap  m-4 w-11/12 border p-4 border-orange-50 align-top items-start rounded-md h-36 text-start' onChange={(e)=>{setForm({...form, desc:e.target.value, userId:auth.currentUser.uid, username:auth.currentUser.displayName, photoURL:auth.currentUser.photoURL })}}/>
      {
        uploadImgLoader?
        <div className='w-full flex justify-center'>
          <TailSpin height='40'/>
        </div>:
        <button onClick={ setFormData} className='bg-blue-500 w-11/12 m-4 mb-20 h-10 rounded-lg'>{uploadDataLoader?<TailSpin  height={25}/>:'Add Post'}</button>
      }

          </div>:<Navigate to={'../login'}/>}
          <BottomNav/>
          </div>
  )
}

export default AddPost