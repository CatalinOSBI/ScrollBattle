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
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

//Interface for the context values/functions
interface authContextInterface {
  firebaseErrorMessage: string;
  setFirebaseErrorMessage: (value: string) => void;
  isLoggedIn: boolean;
  emailRef: RefObject<HTMLInputElement>;
  usernameRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  conPasswordRef: RefObject<HTMLInputElement>;
  emailLogRef: RefObject<HTMLInputElement>;
  passwordLogRef: RefObject<HTMLInputElement>;
  userEmail: string | null;
  userDisplayName: string | null;
  handleSignOut: () => void;
  handleSignUp: (
    username: string,
    email: string,
    password: string,
    conPassword: string,
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
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const conPasswordRef = useRef<HTMLInputElement>(null);
  const emailLogRef = useRef<HTMLInputElement>(null);
  const passwordLogRef = useRef<HTMLInputElement>(null);

  const { handleSetActive } = useMenu();

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
  const FireStoreDB = getFirestore(app);
  const providerGoogle = new GoogleAuthProvider();
  // connectAuthEmulator(auth, "http://localhost:9099");

  //Sign Up (Create Account)
  const handleSignUp = (
    username: string,
    email: string,
    password: string,
    conPassword: string,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Check for errors
    // Password and Email required
    if (!email || !password) {
      return Promise.reject("Password and email are required"); //Break

      // Passwords don't match
    } else if (password !== conPassword) {
      return Promise.reject("Passwords do not match"); //Break

      // Short Password
    } else if (password.length <= 5) {
      return Promise.reject("Password should be at least 6 characters"); //Break

      // Username Required
    } else if (!username) {
      return Promise.reject("Username required"); //Break
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user!;
        console.log(user);

        // sendEmailVerification(user);
        // update username
        updateProfile(user, { displayName: username });
        console.log("Updated Username");
        console.log("User signed in successfully!");
        // Change Menu
        handleSetActive(<MainMenu />);
        // Update FirestoreDB
        handleUpdateUserDB()
        // Change the display name
        setUserDisplayName(username);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Check for firebase errors
        // Invalid Email
        if (errorCode === "auth/invalid-email") {
          console.error("Invalid email format");
          setFirebaseErrorMessage("Invalid email format");

          // Email Already in use
        } else if (errorCode === "auth/email-already-in-use") {
          console.error("Email already in use");
          setFirebaseErrorMessage("Email already in use");

          // Network error
        } else if (errorCode === "auth/network-request-failed") {
          console.error("Network error");
          setFirebaseErrorMessage("Network error");

          // Other
        } else {
          console.error(`Error [${errorCode}]: ${errorMessage}`);
          setFirebaseErrorMessage(`Error [${errorCode}]: ${errorMessage}`);
        }
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
        handleSetActive(<MainMenu />);
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
        setUserEmail(user.email!);
        setUserDisplayName(user.displayName!);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  //Update userDB
  const handleUpdateUserDB = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uID = currentUser.uid;

      // DB Object
      const docData = {
        userId: uID,
      };

      // DB Doc Path
      const docPath = doc(FireStoreDB, `users/${uID}`);
      try {
        // Check if Document exists
        const myDocument = await getDoc(docPath);

        if (!myDocument.exists()) {
          // If document does not exist, create an empty document (or add fields if needed)
          await setDoc(docPath, docData); // Optional to store userId
          console.log("Updated User DB (New User)");
        } else {
          console.log("User document already exists");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseErrorMessage,
        setFirebaseErrorMessage,
        isLoggedIn,
        emailRef,
        passwordRef,
        conPasswordRef,
        emailLogRef,
        passwordLogRef,
        userEmail,
        usernameRef,
        userDisplayName,
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
