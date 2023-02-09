// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDuwTQeF432CJqD0KhmZktGrNemTXxaw4o',
  authDomain: 'chat-d09cc.firebaseapp.com',
  projectId: 'chat-d09cc',
  storageBucket: 'chat-d09cc.appspot.com',
  messagingSenderId: '775237936474',
  appId: '1:775237936474:web:6538caa535f73e19f4ff63'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider, storage }
