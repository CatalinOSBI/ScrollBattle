"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  RefObject,
} from "react";
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app"; // firebase typescript
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
} from "firebase/auth";

//Interface for the context values/functions
interface authContextInterface {
  value: string;
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  handleSignUp: (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}

//Expecting React children components
interface authProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<authContextInterface | undefined>(
  undefined
);

//Provider component
export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
  const [value, setTheme] = useState("light");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const firebaseConfig = {

  };

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099");

  //Sing Up (Create Account)
  const handleSignUp = (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user!;
        console.log(user);
        // sendEmailVerification(user);
        console.log("User signed in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <AuthContext.Provider
      value={{ value, emailRef, passwordRef, handleSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
