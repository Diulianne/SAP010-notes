import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xkb5RjyDbfz-xEBp8YMkNuRzjpolB-g",
  authDomain: "labnotes-1b2b4.firebaseapp.com",
  projectId: "labnotes-1b2b4",
  storageBucket: "labnotes-1b2b4.appspot.com",
  messagingSenderId: "618065636814",
  appId: "1:618065636814:web:33030ef766de58b6c88f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {
  app, auth, db
};