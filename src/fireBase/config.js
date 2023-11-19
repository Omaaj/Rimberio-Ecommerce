import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "rimberioss.firebaseapp.com",
  projectId: "rimberioss",
  storageBucket: "rimberioss.appspot.com",
  messagingSenderId: "2582600919",
  appId: "1:2582600919:web:8a50422afebbf85b366492"
};


// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app

