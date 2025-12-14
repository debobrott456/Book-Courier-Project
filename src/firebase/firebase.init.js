// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdAUhXgEEPqph_NCO9oFZLgHtaerOgtsI",
  authDomain: "book-courier-3163a.firebaseapp.com",
  projectId: "book-courier-3163a",
  storageBucket: "book-courier-3163a.firebasestorage.app",
  messagingSenderId: "1076422903324",
  appId: "1:1076422903324:web:4111acf7e1584850ea41d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)