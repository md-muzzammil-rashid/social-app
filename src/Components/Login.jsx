import React, { useContext, useEffect, useState } from 'react'
import { auth, provider, db } from './firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, } from 'react-router-dom'
import { appState } from '../App'
import { setDoc, doc, getDoc } from 'firebase/firestore'

const Login = () => {

    const useAppState = useContext(appState);
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const clickHandler = () => {
        try {
            signInWithPopup(auth, provider).then(async (data) => {
                useAppState.setLogin(true)


                const res = await getDoc(doc(db, 'userDB', data.user.uid))
                if (!res.exists()) {
                    setDoc(doc(db, 'userChats', data.user.uid), {}).then(
                        setDoc(doc(db, `userDB/${data.user.uid}`), {
                            uid: data.user.uid,
                            displayName: data.user.displayName,
                            photoURL: data.user.photoURL,
                            email: data.user.email,
                            bio: ''
                        })
                    )
                }

                localStorage.setItem('email', data.user.email)
                navigate('/home')
                useAppState.setLogin(true)


            })
        }
        catch (err) {
            console.log(err)
        }


    }
    useEffect(() => {
        setValue(localStorage.getItem('email'))

    }, [value])
    return (

        <div className="flex items-center justify-center min-h-screen bg-black flex flex-col gap-10 ">
            <div className=''>
                <h2 className='font-bold text-4xl'>Welcome Back</h2>
                <h2 className='font-semibold text-xl'>SignIn to Continue</h2>
            </div>
            <button onClick={clickHandler}
                aria-label="Sign in with Google"
                className="flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3 bg-white"
            >
                <div class="flex items-center justify-center bg-white w-9 h-9 rounded-l bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 bg-white">
                        <title className='bg-white'>Sign in with Google</title>
                        <desc className='bg-white'> Google G Logo</desc>
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            class="fill-google-logo-blue"
                        ></path>
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            class="fill-google-logo-green"
                        ></path>
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            class="fill-google-logo-yellow"
                        ></path>
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            class="fill-google-logo-red"
                        ></path>
                    </svg>
                </div>
                <span class="text-sm text-google-text-gray tracking-wider bg-white font-bold">Sign in with Google</span>
            </button>
        </div>

    )
}


export default Login