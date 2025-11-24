// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KjYkgGFmbB1vfaiD6DEUywm7wOhe2nI",
  authDomain: "witchen-caf06.firebaseapp.com",
  projectId: "witchen-caf06",
  storageBucket: "witchen-caf06.firebasestorage.app",
  messagingSenderId: "405772064786",
  appId: "1:405772064786:web:2e2df3e3055f47ab5a60cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
