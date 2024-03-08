import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config'

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

export { firebase, auth }
