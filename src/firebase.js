import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCMhskq9Jt0E4mGg8_vyZ0AYWt2TIZBL0",
  authDomain: "emotion-diary-fc6ff.firebaseapp.com",
  projectId: "emotion-diary-fc6ff",
  storageBucket: "emotion-diary-fc6ff.appspot.com",
  messagingSenderId: "654463775708",
  appId: "1:654463775708:web:ee96ae7790c7809a36d519",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore();
