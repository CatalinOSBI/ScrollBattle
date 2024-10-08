import React from "react";
import OSBIbutton from "../Buttons/OSBIbutton";
import localFont from "next/font/local";
import {
  MainUi,
  LogInUi,
  SignUpUi,
} from "../Buttons/AuthButtons/AuthButtons";

const boldFont = localFont({
  src: "../../fonts/THEBOLDFONT.ttf",
  variable: "--font-bold",
});

const noodleFont = localFont({
  src: "../../fonts/big_noodle_titling.ttf",
  variable: "--font-bold",
});

/////////////////////
/////Start Menu//////
/////////////////////

export const MainMenu = () => {
  return (
    <div className="w-2/5 p-20 border gap-4 rounded-md max-w-md min-h-[600px] min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 bg-[#212121] menu">
      <div className="flex flex-col items-end mb-[10rem]">
        <p className={`${boldFont.className} text-8xl`}>
          <span className="italic">Scr</span>oll
        </p>
        <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>
          Battle
        </p>
      </div>
      <OSBIbutton buttonName="PLAY" width={248}/>
      <MainUi />
    </div>
  );
};

//////////////////////
/////SignUp Menu//////
//////////////////////

export const SignUpMenu = () => {
  return (
    <div className="w-2/5 p-20 border gap-4 rounded-md max-w-md min-h-[600px] min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 bg-[#212121] menu">
      <div className="flex flex-col items-end mb-1">
        <p className={`${boldFont.className} text-8xl`}>
          <span className="italic">Si</span>gn
        </p>
        <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>
          Up
        </p>
      </div>

      <SignUpUi />
    </div>
  );
};

//////////////////////
/////LogIn Menu///////
//////////////////////

export const LogInMenu = () => {
  return (
    <div className="w-2/5 p-20 border gap-4 rounded-md max-w-md min-h-[600px] min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 bg-[#212121] menu">
      <div className="flex flex-col items-end mb-[2rem]">
        <p className={`${boldFont.className} text-8xl`}>
          <span className="italic">L</span>og
        </p>
        <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>
          In
        </p>
      </div>

      <LogInUi />
    </div>
  );
};

////////////////////////////
/////RecPassword Menu///////
////////////////////////////

export const RecPasswordMenu = () => {
  return (
    <div className="w-2/5 p-20 border gap-4 rounded-md max-w-md min-h-[600px] min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 bg-[#212121] menu">
      <div className="flex flex-col items-end mb-[2rem]">
        <p className={`${boldFont.className} text-8xl`}>
          <span className="italic">Re</span>cover
        </p>
        <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>
          Password
        </p>
      </div>

      {/* <LogInUi /> */}
    </div>
  );
};
