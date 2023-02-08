// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'chat-d09cc.firebaseapp.com',
  projectId: 'chat-d09cc',
  storageBucket: 'chat-d09cc.appspot.com',
  messagingSenderId: '775237936474',
  appId: '1:775237936474:web:6538caa535f73e19f4ff63'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider }
