// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Fi frrebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD343r58bFq81ViiV73xMyy1irl-kQ2u0M",
  authDomain: "proyecto-test-ag.firebaseapp.com",
  projectId: "proyecto-test-ag",
  storageBucket: "proyecto-test-ag.appspot.com",
  messagingSenderId: "486598335239",
  appId: "1:486598335239:web:04d2c50aea83f04f1983a2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const baseDato = getFirestore();
const facebook = new FacebookAuthProvider();

export {
  app,
  google, 
  baseDato,
  facebook
}