import "./home.css";
import ActiveMenu from "./ui/Menus/ActiveMenu";

export default function Home() {

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
    
        <ActiveMenu />
      </div>
    </main>
  );
}
