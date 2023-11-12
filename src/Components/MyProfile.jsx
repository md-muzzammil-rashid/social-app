import  { useContext, React} from 'react'
import { appState } from '../App'
import { getAuth } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import BottomNav from './BottomNav'

const MyProfile = () => {
    const useAppState = useContext(appState)
    const auth =  getAuth()
    return (
      <>
            <div>
                {useAppState.login?  
                    <>
                    
<div className='flex '>
  <div className='m-4'>
    <img className='rounded-full ' height={'100'} width={'100'} src={auth.currentUser.photoURL} alt="" />
  </div>
  <div className='flex w-full justify-around p-1 items-center flex-wrap'>

  <div>
    <h1 className='font-bold text-lg'>82</h1>
    Post
  </div>
  <div>
    <h1 className='font-bold text-lg'>421</h1>
    Followers
  </div>
  <div>
    <h1 className='font-bold text-lg'>182</h1>
    Following
  </div>
  </div>
</div>
    <div className='p-2 pl-4 pt-0'>
      <h2 className='flex font-bold'>{auth.currentUser.displayName}</h2>
      <p className='flex'>{auth.currentUser.bio}</p>
    </div>
    <div className='w-full'> 
      <button className='bg-zinc-900 font-semibold p-1 px-6 mr-2 rounded-lg w-5/12'> Edit Profile </button>
      <button className='bg-zinc-900 p-1 px-6  ml-2 rounded-lg font-semibold w-5/12'> Share Profile </button>
    </div>
                      <button onClick={() => {
                    signOut(auth).then(useAppState.setLogin(false))
                }}>LOGOUT</button>
                
                </>
                    :
                    <Link to={'/login'}><h2>user Not Ligin</h2></Link>
            }  
           
            
              
                

            </div>
            <BottomNav/>
            
            </>
    )
}

export default MyProfile