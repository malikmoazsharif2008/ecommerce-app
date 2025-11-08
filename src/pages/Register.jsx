import React from "react";
import AuthForm from "../components/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const handleRegister = async ({ name, email, password }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert(error.message);
    }
  };

  return <AuthForm title="Register" onSubmit={handleRegister} />;
};

export default Register;
