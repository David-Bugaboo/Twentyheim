import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9u9f7iZV193eLAmpJQIi43aSkVnAuCUM",
  authDomain: "heim-warbandbuilder.firebaseapp.com",
  projectId: "heim-warbandbuilder",
  storageBucket: "heim-warbandbuilder.firebasestorage.app",
  messagingSenderId: "910310085071",
  appId: "1:910310085071:web:2a2a74e62199780ecbc2ba",
  measurementId: "G-6RFYBV54S3",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);
