import * as React from "react";
//import { Component } from "react";
import wave_image from "../media/wave.svg";
import wave_down_image from "../media/wave_down.svg";

const Waves = () => {
  return (
    <div className="waves">
      <img
        src={wave_image}
        alt="waves"
        className="object-fill w-screen absolute top-0 pointer-events-none select-none z-behind"
      />
      <img
        src={wave_down_image}
        alt="waves"
        className="object-fill w-screen absolute bottom-0 pointer-events-none select-none  z-behind"
      />
    </div>
  );
};

export default Waves;
