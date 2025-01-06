// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDezBhOCUXl9TnstsUgq3r5gcpkLriGnSE",
  authDomain: "shopapp-e65a2.firebaseapp.com",
  projectId: "shopapp-e65a2",
  storageBucket: "shopapp-e65a2.firebasestorage.app",
  messagingSenderId: "447170710654",
  appId: "1:447170710654:web:9967a5d7baf54e77c15c2f",
  measurementId: "G-WW0YBNWKCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;