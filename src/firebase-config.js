// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9wNAaRedI2OnbdGZCt3TvwS3hruZQWU4",
  authDomain: "to-do-list-9f7bf.firebaseapp.com",
  projectId: "to-do-list-9f7bf",
  storageBucket: "to-do-list-9f7bf.appspot.com",
  messagingSenderId: "401384868532",
  appId: "1:401384868532:web:e6dea2af77867dc62ce5e1",
  measurementId: "G-HZD6LX7PLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);