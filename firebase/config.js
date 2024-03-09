// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnfcY_sVYheu62uflqz5uVMqZJ7cwWUZk",
  authDomain: "not-pinterest.firebaseapp.com",
  projectId: "not-pinterest",
  storageBucket: "not-pinterest.appspot.com",
  messagingSenderId: "959632853869",
  appId: "1:959632853869:web:2323e70da9949c810c6864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }