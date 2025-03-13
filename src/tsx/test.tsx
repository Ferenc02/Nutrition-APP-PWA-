import * as React from "react";
import { Component } from "react";

const Viggo = (props: any) => {

  let render;

  if(props.button = "green"){
    render = <div>small button</div>
  }
  else if(props.button == "red"){
    render = <div>medium button</div>
  }
  return (
    <div>
      <p>{props.taps}</p>
    </div>
  );
};
export default Viggo;
