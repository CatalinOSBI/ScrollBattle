import "./home.css";
import localFont from "next/font/local";
import OSBIbutton from "./ui/OSBIbutton";

const boldFont = localFont({
  src: "./fonts/THEBOLDFONT.ttf",
  variable: "--font-bold",
});

const noodleFont = localFont({
  src: "./fonts/big_noodle_titling.ttf",
  variable: "--font-bold",
});

export default function Home() {
  return (
    <main className="stars">
      <div className="background flex items-center justify-center h-lvh">
        <button className="iconButton rounded-full bg-[#dadada] p-3 m-3 absolute top-0 right-0" title="View Profile"> <img src="/User.svg"></img> </button>
        <div className="w-2/5 border gap-4 rounded-md max-w-md min-w-[21.5rem] flex flex-col items-center justify-center h-2/4 menu">
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
      </div>
    </main>
  );
}
