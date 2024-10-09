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
import { MainMenu } from "./AuthMenus";

//Interface for the context values/functions
interface menuContextInterface {
  handleSetActive(component:React.JSX.Element):void;
  activeMenu: React.JSX.Element;
}

//Expecting React children components
interface menuProviderProps {
  children: ReactNode;
}

export const MenuContext = createContext<menuContextInterface | undefined>(
  undefined
);

//Provider component
export const MenuProvider: React.FC<menuProviderProps> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<React.JSX.Element>(<MainMenu/>);

  //Selecting Menu Function
  const handleSetActive = (component: React.JSX.Element):void => {
    setActiveMenu(component);
  };

  return (
    <MenuContext.Provider
      value={{
        handleSetActive,
        activeMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within an MenuProvider");
  }
  return context;
};
