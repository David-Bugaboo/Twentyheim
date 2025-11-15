// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDsz1Xi9s6MFkIYk_AbV9_A6BtqoI7v60o",

  authDomain: "twentyhammer-webpage.firebaseapp.com",

  projectId: "twentyhammer-webpage",

  storageBucket: "twentyhammer-webpage.firebasestorage.app",

  messagingSenderId: "570931430820",

  appId: "1:570931430820:web:293daa5329c8ff6076ad31",

  measurementId: "G-Q88SZEQD5V",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// Analytics inicializado mas não usado no momento
// eslint-disable-next-line @typescript-eslint/no-unused-vars
void getAnalytics(app);
