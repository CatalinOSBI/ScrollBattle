"use client";
import React from "react";
import OSBIbutton from "../OSBIbutton";
import Googlebutton from "../Googlebutton";
import { useMenu } from "../../Menus/MenuContext";
import { SignUpMenu, LogInMenu, RecPasswordMenu } from "../../Menus/AuthMenus";
import styles from "./AuthButtons.module.css";
import localFont from "next/font/local";

const helveticaMedium = localFont({
  src: "../../../fonts/HelveticaNowText-Medium.ttf",
  variable: "--font-helvetica-medium",
});

const helveticaRegular = localFont({
  src: "../../../fonts/HelveticaNowText-Regular.ttf",
  variable: "--font-helvetica-regular",
});

export const MainUi = () => {
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

export const SignUpUi = () => {
  const { handleSetActive } = useMenu();
  return (
    <div className="flex flex-col items-center gap-4">
      <label>
        Username:
        <input type="text" autoComplete="new-username"/>
      </label>

      <label>
        Email:
        <input type="email" autoComplete="email" />
      </label>

      <label>
        Password:
        <input type="password" name='new-password' autoComplete="new-password" />
      </label>

      <label>
        Confirm Password:
        <input type="password" name='new-password' autoComplete="new-password" />
      </label>

      <OSBIbutton
        buttonName="SIGN UP"
        width={248}
        primColor="rgb(53 53 53) 0%"
        secColor="rgb(77 77 77 / 93%) 100%"
      />

      <div className="flex flex-col items-center">
        <p
          className={`${helveticaRegular.className} text-[#999999] text-nowrap`}
        >
          Already have an account?{" "}
          <span
            className={`${helveticaMedium.className} ${styles.highlight} text-[#d7d7d7]`}
            onClick={() => handleSetActive(<LogInMenu />)}
          >
            Log In
          </span>
        </p>

        <span
          className={`${helveticaMedium.className} ${styles.highlight} text-[#d7d7d7]`}
          onClick={() => handleSetActive(<RecPasswordMenu />)}
        >
          Forgot your password?
        </span>
      </div>
    </div>
  );
};

export const LogInUi = () => {
  const { handleSetActive } = useMenu();
  return (
    <div className="flex flex-col items-center gap-4">
      <label>
        Email:
        <input type="email" autoComplete='email' />
      </label>

      <label>
        Password:
        <input type="password" autoComplete='off' />
      </label>

      <OSBIbutton
        buttonName="LOG IN"
        width={248}
        primColor="rgb(53 53 53) 0%"
        secColor="rgb(77 77 77 / 93%) 100%"
      />

      <div className="flex justify-center items-center bg-white scale-90 w-full h-[1px] opacity-35">
        <p className="bg-[#212121] absolute p-1 ">Or</p>
      </div>

      <Googlebutton />

      <div className="flex flex-col items-center">
        <p
          className={`${helveticaRegular.className} text-[#999999] text-nowrap`}
        >
          Don't have an account?{" "}
          <span
            className={`${helveticaMedium.className} ${styles.highlight} text-[#d7d7d7]`}
            onClick={() => handleSetActive(<SignUpMenu />)}
          >
            Sign Up
          </span>
        </p>

        <span
          className={`${helveticaMedium.className} ${styles.highlight} text-[#d7d7d7]`}
          onClick={() => handleSetActive(<RecPasswordMenu />)}
        >
          Forgot your password?
        </span>
      </div>
    </div>
  );
};
