// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXYRsoJ6_x6BnfhK5ny3kW4f3wACpxxzQ",
  authDomain: "fir-next-app-f28ae.firebaseapp.com",
  projectId: "fir-next-app-f28ae",
  storageBucket: "fir-next-app-f28ae.firebasestorage.app",
  messagingSenderId: "665757352101",
  appId: "1:665757352101:web:8bc96746051c17c0940d4c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
