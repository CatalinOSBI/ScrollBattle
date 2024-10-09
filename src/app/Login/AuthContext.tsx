"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  RefObject,
} from "react";
import { useMenu } from "../ui/Menus/MenuContext";
import { MainMenu } from "../ui/Menus/AuthMenus";

//3rd party
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app"; // firebase typescript
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//Interface for the context values/functions
interface authContextInterface {
  isLoggedIn: boolean;
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  emailLogRef: RefObject<HTMLInputElement>;
  passwordLogRef: RefObject<HTMLInputElement>;
  userEmail: string | null;
  handleSignOut: () => void;
  handleSignUp: (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleLogIn: (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleGoogleLogIn: () => Promise<void>;
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailLogRef = useRef<HTMLInputElement>(null);
  const passwordLogRef = useRef<HTMLInputElement>(null);

  const { handleSetActive } = useMenu()

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRE1,
    authDomain: process.env.NEXT_PUBLIC_FIRE2,
    projectId: process.env.NEXT_PUBLIC_FIRE3,
    storageBucket: process.env.NEXT_PUBLIC_FIRE4,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE5,
    appId: process.env.NEXT_PUBLIC_FIRE6,
    measurementId: process.env.NEXT_PUBLIC_FIRE7,
  };

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const providerGoogle = new GoogleAuthProvider();
  // connectAuthEmulator(auth, "http://localhost:9099");

  //Sing Up (Create Account)
  const handleSignUp = (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Check for empty fields
    if (!email || !password) {
      return Promise.reject("Password and email are required"); //Break
    }

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

  //Log In
  const handleLogIn = (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user!;
        console.log("User logged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  // Google LogIn
  const handleGoogleLogIn = async (): Promise<void> => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //Null check
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log(credential);
          console.log(token);
          console.log(user);
        }
        // Signed up w/ google...
        handleSetActive(<MainMenu/>);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
        //Signed out
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  //Check when user logs in/out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);

        //Get user data
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        emailRef,
        passwordRef,
        emailLogRef,
        passwordLogRef,
        userEmail,
        handleSignUp,
        handleSignOut,
        handleLogIn,
        handleGoogleLogIn,
      }}
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
