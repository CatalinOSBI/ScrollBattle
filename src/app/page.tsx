import "./home.css";
import localFont from "next/font/local";

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
    <main className="flex items-center justify-center h-lvh">
      <div className="w-2/5 border rounded-md max-w-md min-w-80 flex items-center justify-center h-2/4 menu">
        <div className="flex flex-col items-end">
          <p className={`${boldFont.className} text-8xl`}>
            <span className="italic">Scr</span>oll
          </p>
          <p className={`${noodleFont.className} text-7xl leading-[3.5rem]`}>Battle</p>
        </div>
      </div>
    </main>
  );
}
