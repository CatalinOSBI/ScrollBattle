import React from 'react'
import OSBIbutton from '../../Buttons/OSBIbutton'
import localFont from 'next/font/local';

const boldFont = localFont({
  src: "../../../fonts/THEBOLDFONT.ttf",
  variable: "--font-bold",
});

const noodleFont = localFont({
  src: "../../../fonts/big_noodle_titling.ttf",
  variable: "--font-bold",
});

const MainMenu = () => {
  return (
    <div className="w-2/5 border gap-4 rounded-md max-w-md min-h-[600px] min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 bg-[#212121] menu">
    <div className="flex flex-col items-end mb-[10rem]">
      <p className={`${boldFont.className} text-8xl`}>
        <span className="italic">Scr</span>oll
      </p>
      <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>
        Battle
      </p>
    </div>
    <OSBIbutton
      buttonName="PLAY"
      width={248}
      primColor="rgb(53 53 53) 0%"
      secColor="rgb(77 77 77 / 93%) 100%"
    />
    <OSBIbutton
      buttonName="SIGN UP"
      width={248}
      primColor="rgb(53 53 53) 0%"
      secColor="rgb(77 77 77 / 93%) 100%"
    />
  </div>
  )
}

export default MainMenu