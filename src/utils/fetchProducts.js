// src/utils/fetchProducts.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

export const fetchProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};