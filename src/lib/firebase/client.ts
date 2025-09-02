// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      // ...
      console.warn("Firestore offline persistence failed: failed-precondition. This can happen with multiple tabs open.");
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
       console.warn("Firestore offline persistence failed: unimplemented. The browser may not support it.");
    }
  });


export { auth, db };
