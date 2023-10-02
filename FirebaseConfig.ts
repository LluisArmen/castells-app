import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzkutqDrVF2gLyjTqYxs_93osN_vTfFqg",
  authDomain: "cappstells.firebaseapp.com",
  projectId: "cappstells",
  storageBucket: "cappstells.appspot.com",
  messagingSenderId: "692657174317",
  appId: "1:692657174317:web:31c1099b857005039805a4",
  measurementId: "G-X75HL52D3T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);