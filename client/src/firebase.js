// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ZxXOpW4PQrBFJlh9JWQNOZuMbcKEFkU",
  authDomain: "video-a6f78.firebaseapp.com",
  projectId: "video-a6f78",
  storageBucket: "video-a6f78.appspot.com",
  messagingSenderId: "907348326714",
  appId: "1:907348326714:web:3e96d0533f03041107b803"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
