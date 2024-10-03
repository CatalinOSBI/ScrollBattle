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
import MainMenu from "./MainMenu";
import SignUpMenu from "./SignUpMenu";
import LogInMenu from "./LoginMenu";

//Interface for the context values/functions
interface menuContextInterface {
  activeMenu: React.JSX.Element;
  handleSetActive(index:number):void;
}

//Expecting React children components
interface menuProviderProps {
  children: ReactNode;
}

interface menu {
  component: React.JSX.Element;
  id: number
}

export const MenuContext = createContext<menuContextInterface | undefined>(
  undefined
);

//Provider component
export const MenuProvider: React.FC<menuProviderProps> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<React.JSX.Element>(<MainMenu/>);

  const menus: menu[] = [
    { component: <MainMenu />, id: 0},
    { component: <SignUpMenu />, id: 1},
    { component: <LogInMenu />, id: 2}
  ];

  // //default to the 1st menu/content
  // useEffect(() => {
  //   handleSetActive(0)
  // }, []);

  //Selecting Menu Function
  const handleSetActive = (index: number):void => {
    setActiveMenu(menus[index].component);
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
