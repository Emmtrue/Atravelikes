// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "new-prototype-yvlyd",
  "appId": "1:625332412492:web:f45a7dc4a6052c189c14e9",
  "storageBucket": "new-prototype-yvlyd.firebasestorage.app",
  "apiKey": "AIzaSyBeYWjGEoJADzViWHegW9w0DUVJLOjNrGw",
  "authDomain": "new-prototype-yvlyd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "625332412492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
