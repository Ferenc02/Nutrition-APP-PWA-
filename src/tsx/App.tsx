import * as React from "react";
import { useState } from "react";
//import { Component } from "react";
import Home from "./Home";
import Scanner from "./Scanner";
import Welcome from "./Welcome";

//bg-green-400 and bg-blue-400

let render;

const App = () => {
  const [home, setHome] = useState(
    localStorage.getItem("daily_intake_calorie") !== null ? true : false
  );

  let getData = (val: any) => {
    // do not forget to bind getData in constructor
    setHome(val);
  };

  if (home) {
    render = <Home />;
  } else {
    render = <Welcome sendSubmitedData={getData} />;
  }
  return <div className="page_container">{render}</div>;
};
export default App;
