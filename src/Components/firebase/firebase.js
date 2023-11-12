import { initializeApp,  } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCp-ScDV6kc6Zn1WvH-ED7zAu1kLP7RvoM",
  authDomain: "verbiconnect.firebaseapp.com",
  projectId: "verbiconnect",
  storageBucket: "verbiconnect.appspot.com",
  messagingSenderId: "1084285920813",
  appId: "1:1084285920813:web:bb8e77990076edcb98baa4",
  measurementId: "G-N09MFRDK4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const cloudDB = getStorage(app)
 const provider = new GoogleAuthProvider()
 const auth = getAuth(app)

export const db = getFirestore(app);
export const postRef = collection(db, 'post');

export{provider,auth}