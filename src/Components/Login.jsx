import React, { useContext, useEffect, useState } from 'react'
import { auth, provider, db } from './firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate,  } from 'react-router-dom'
import { appState } from '../App'
import { setDoc, doc, getDoc } from 'firebase/firestore'

const Login = () => {

    const  useAppState = useContext(appState);
    const [value, setValue]=useState('')
    const navigate = useNavigate()
    const clickHandler = () =>{
        try{
            signInWithPopup(auth, provider).then(async(data)=>{
            useAppState.setLogin(true)

            setDoc(doc(db, `userDB/${data.user.uid}`), {
                uid: data.user.uid, 
                displayName: data.user.displayName, 
                photoURL: data.user.photoURL,
                email: data.user.email,
                bio:''
            })
            const res =await getDoc(doc(db,'userDB',data.user.uid ))
            if(!res.exists())
            {
                setDoc(doc(db, 'userChats', data.user.uid),{})
            }

            localStorage.setItem('email', data.user.email)
            navigate('/home')
            useAppState.setLogin(true)
            
                        
        })
        }
        catch(err)
        {
            console.log(err)
        }
        
       
        }
        useEffect(()=>{
            setValue(localStorage.getItem('email'))

        },[value])
        return (
            
            <div className="flex items-center justify-center min-h-screen bg-black  ">
                <button onClick={clickHandler}>Continue with Google</button>
            </div>
       
       )
    }


export default Login