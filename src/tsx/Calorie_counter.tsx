import * as React from "react";
import { Component, useEffect, useState } from "react";
import background_circle from "../media/background_circle.svg";
const Progress = require("@delowar/react-circle-progressbar");

interface Props {
  percentage: number;
}
//change props.percentage to calories instead
const Calorie_counter = (props: Props) => {
  let daily_calorie_count: number = Number(
    localStorage.getItem("daily_calorie_count")
  );
  let daily_intake_calorie: number = Number(
    localStorage.getItem("daily_intake_calorie")
  );
  return (
    <div className="absolute inset-0 w-min h-min m-auto bottom-10">
      <div className="relative transform scale-125">
        <Progress
          key={props.percentage}
          percent={Math.min(props.percentage, 100)}
          isGradient
          gradient={{
            angle: 5000,
            //old color 60A5FA
            startColor: "#DACC3E",
            stopColor: "#34D399",
          }}
          isBgShadow
          bgShadow={{
            inset: false,
            vertical: 4,
            horizontal: 0,
            blur: 1,
            opacity: 0.04,
            color: "#000000",
          }}
          emptyColor="#F6F8F9"
        >
          <div className="text-center p-1">
            <p
              className={`montserat text-4xl font-bold p-1 tracking-wide ${
                daily_calorie_count > daily_intake_calorie
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {Math.round(daily_calorie_count)}
            </p>
            <p
              className={`montserat text-xs font-thin ${
                daily_calorie_count > daily_intake_calorie
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              OF {daily_intake_calorie} KCAL
            </p>
          </div>
        </Progress>
      </div>
    </div>
  );
};
export default Calorie_counter;

/*

 <p className="absolute inset-0 m-auto w-min h-min text-center z-50">
          2143 <br /> calories
        </p>

 <div className="w-40 h-40 rounded-full calorie_counter_background shadow-xl z-20"></div>
        <div className="w-32 h-32 bg-gray-400 rounded-full z-10 absolute inset-0 m-auto"></div>
        <div className="w-10 h-20 bg-blue-400 absolute top-0 left-0 right-0 m-auto z-5"></div>
*/
