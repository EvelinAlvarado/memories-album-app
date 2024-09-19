// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//*1-----Import getFirestore: to get a database hosting in firebase
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAklTJvRFFCjvaqVxyspSVIw3P9vx_N0BI",
  authDomain: "memories-album-app.firebaseapp.com",
  projectId: "memories-album-app",
  storageBucket: "memories-album-app.appspot.com",
  messagingSenderId: "403191759899",
  appId: "1:403191759899:web:2678afe3eb0ba0dec364be",
  measurementId: "G-LPJ8QXWZBS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//*2------Initialize Firestore and exporting to use everywhere
export const db: Firestore = getFirestore(app);
