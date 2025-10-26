import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC3QqEnzmarWoCdIKDMfmMxxDN3B7tsQg",
  authDomain: "e-commerce--app-64ae8.firebaseapp.com",
  projectId: "e-commerce--app-64ae8",
  storageBucket: "e-commerce--app-64ae8.firebasestorage.app",
  messagingSenderId: "216730011031",
  appId: "1:216730011031:web:c492456cf6ee11b229f0d2",
  measurementId: "G-PWXLMT6PWB"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
