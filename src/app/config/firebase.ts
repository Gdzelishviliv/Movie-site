import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAIaf80MuNBHbPfXPOEDRsjBCMiO1jeL4Y",
  authDomain: "movie-web-app-a5433.firebaseapp.com",
  projectId: "movie-web-app-a5433",
  storageBucket: "movie-web-app-a5433.appspot.com",
  messagingSenderId: "424217147896",
  appId: "1:424217147896:web:32ee738c8f742f74437e0d",
  measurementId: "G-L84TWK33YH"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);