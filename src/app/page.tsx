"use client";
import "./home.css";
import { useMenu } from "./ui/Menus/MenuContext";

export default function Home() {
  const { handleSetActive, activeMenu } = useMenu();

  return (
    <main className="stars">
      <div className="background flex items-center justify-center h-lvh">
        <button
          className="iconButton rounded-full bg-[#dadada] p-3 m-3 absolute top-0 right-0"
          title="View Profile"
        >
          {" "}
          <img src="/User.svg"></img>{" "}
        </button>
         {activeMenu}
        <button className="border p-5" onClick={()=>handleSetActive(0)}>1</button>
        <button className="border p-5" onClick={()=>handleSetActive(1)}>2</button>
        <button className="border p-5" onClick={()=>handleSetActive(2)}>3</button>
      </div>
    </main>
  );
}
