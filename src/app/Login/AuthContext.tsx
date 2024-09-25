import React, { createContext, useContext ,useState } from 'react';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FirebaseApp } from 'firebase/app'; // firebase typescript

//Interface for the context values/functions 
interface authContextInterface{
  value: string;
}

//Expecting React children components
interface authProviderProps {
  children: React.ReactNode
}

const firebaseConfig = {
//This is wehre the config data goes, add the .env file later
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export const AuthContext = createContext< authContextInterface| undefined>(undefined);

//Provider component
export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
  const [value, setTheme] = useState('light');

  return (
    <AuthContext.Provider value={{value}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};