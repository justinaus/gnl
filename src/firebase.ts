// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'gnlt-cb687.firebaseapp.com',
  projectId: 'gnlt-cb687',
  storageBucket: 'gnlt-cb687.appspot.com',
  messagingSenderId: '720006947863',
  appId: '1:720006947863:web:e772920f870f19e36c2852',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
