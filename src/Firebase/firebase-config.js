// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh2U8JaPwOCIHtagVlZx6JZEXt3NA5YOU",
  authDomain: "quickfit-90b00.firebaseapp.com",
  projectId: "quickfit-90b00",
  storageBucket: "quickfit-90b00.appspot.com",
  messagingSenderId: "753355961614",
  appId: "1:753355961614:web:3202461ed42a14c22b935f",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore();

export { auth, db };
