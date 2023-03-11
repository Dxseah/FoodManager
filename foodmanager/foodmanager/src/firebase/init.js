import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBdTJ0xrY4Sc1Tu_kdQAAqMw6eIKYoS9ao",
    authDomain: "foodmanager-c0afa.firebaseapp.com",
    projectId: "foodmanager-c0afa",
    storageBucket: "foodmanager-c0afa.appspot.com",
    messagingSenderId: "372272255912",
    appId: "1:372272255912:web:79ad46103b5e118249439d"
  };

// init firebase
initializeApp(firebaseConfig)

// init & export firestore service
export const db = getFirestore()
// generate & export auth object
export const auth = getAuth()