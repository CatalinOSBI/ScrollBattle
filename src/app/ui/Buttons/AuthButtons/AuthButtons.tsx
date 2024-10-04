"use client";
import React from "react";
import OSBIbutton from "../OSBIbutton";
import { useMenu } from "../../Menus/MenuContext";
import { SignUpMenu, LogInMenu } from "../../Menus/AuthMenus";

export const GoToLogIn = () => {
  const { handleSetActive } = useMenu();
  return (
    <>
      <OSBIbutton
        onClick={() => handleSetActive(<LogInMenu />)}
        buttonName="LOG IN"
        width={248}
        primColor="rgb(53 53 53) 0%"
        secColor="rgb(77 77 77 / 93%) 100%"
      />
    </>
  );
};

export const GoToLogInSpan = () => {
  const { handleSetActive } = useMenu();
  return (
    <p>
      Already have an account?{" "}
      <span onClick={() => handleSetActive(<LogInMenu />)}>Log In</span>
    </p>
  );
};

export const GoToSignUpSpan = () => {
  const { handleSetActive } = useMenu();
  return (
    <p>
      Don't have an account?{" "}
      <span onClick={() => handleSetActive(<SignUpMenu />)}>Sign Up</span>
    </p>
  );
};

