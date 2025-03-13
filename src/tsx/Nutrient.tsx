import * as React from "react";
import { Component } from "react";

interface Props {
  img_src: any;
  percentage: Number;
}

const Nutrient = (props: Props) => {
  let color = props.percentage > 100 ? "red" : "black";
  return (
    <div
      className={`flex w-max flex-row px-0.5 justify-center items-center font-medium text-${color}-500`}
    >
      <img src={props.img_src} alt="Nutrient" className="p-1"></img>
      <p className="p-2">{props.percentage}%</p>
    </div>
  );
};
export default Nutrient;
