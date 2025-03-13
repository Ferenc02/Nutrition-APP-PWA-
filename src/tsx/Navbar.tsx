import * as React from "react";
//import { Component } from "react";
import navbar_button from "../media/navbar_button.svg";
const Navbar = () => {
  const resetEverything = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <nav className="flex p-6 relative items-center justify-center">
      <div className="w-16 flex items-center justify-center">
        <button onClick={resetEverything}>
          <img src={navbar_button} alt="navbar button" className="w-8" />
        </button>
      </div>
      <div className="montserrat w-full text-white text-2xl font-light text-center">
        <button>Progress</button>
      </div>
      <div className="rounded-full w-16 flex items-center justify-center shadow-xl">
        <button>
          <img
            src="https://avatars.dicebear.com/api/avataaars/:seed.svg?background=%23ffffff"
            alt="avatar"
            className="w-full h-full rounded-full"
          ></img>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
