import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export const UserContext = createContext()
export const UserContextProvider = ({children})=>{
    const [currentUser , setCurrrentUser]=useState({})
    useEffect(()=>{

        onAuthStateChanged(getAuth(),(user)=>{
            if(user){
                setCurrrentUser(user)
                // console.log(currentUser)
            }
        })
    },[])
    return(
        <UserContext.Provider value={{currentUser, setCurrrentUser}} >
            {children}
        </UserContext.Provider>
        )
}