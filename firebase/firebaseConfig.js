// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOFAhU18ITnljOJ3L9n9-TlcJ5XtTotNY",
  authDomain: "agenda-virtual-fearc.firebaseapp.com",
  databaseURL: "https://agenda-virtual-fearc-default-rtdb.firebaseio.com",
  projectId: "agenda-virtual-fearc",
  storageBucket: "agenda-virtual-fearc.appspot.com",
  messagingSenderId: "153894393930",
  appId: "1:153894393930:web:03250e959f337036bc2eb3",
  measurementId: "G-GBQXYWJML6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const at = getAuth(app);
const storage = getStorage(app);

export default {db, at, storage}