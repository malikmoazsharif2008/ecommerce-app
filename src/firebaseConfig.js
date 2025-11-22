import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcXDf4WaCZl7AIgGbb3U1jXY2K0iW2Zkg",
  authDomain: "e-commerce-c3404.firebaseapp.com",
  projectId: "e-commerce-c3404",
storageBucket: "e-commerce-c3404.appspot.com",
 messagingSenderId: "348499212215",
  appId: "1:348499212215:web:87ea6bd7a7672e9ca2da32",
  measurementId: "G-XT3CK14JMT"
}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
