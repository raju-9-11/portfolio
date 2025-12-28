// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzljm2NFMmfHKUfSVK8u_PwSvvUSPkzAE",
  authDomain: "portfolio-pac.firebaseapp.com",
  projectId: "portfolio-pac",
  storageBucket: "portfolio-pac.firebasestorage.app",
  messagingSenderId: "222630410662",
  appId: "1:222630410662:web:ef8d048d7befd5c1ed7767"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
