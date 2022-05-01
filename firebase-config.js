import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUU4iVoMJobeTf17kWxyMwQsVyse94q8I",
  authDomain: "chat-16c31.firebaseapp.com",
  projectId: "chat-16c31",
  storageBucket: "chat-16c31.appspot.com",
  messagingSenderId: "2416745622",
  appId: "1:2416745622:web:b1fa5d1942a1096305b6b7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
