import React, { useEffect, useState } from "react";
import AddFood from "./AddFood";
import Calorie_counter from "./Calorie_counter";
import TodaysDate from "./Date";
import Foods from "./Foods";
//import { Component } from "react";
import Navbar from "./Navbar";
import Nutrients from "./Nutrients";
import Scanner from "./Scanner";
import Waves from "./Waves";

const Home = () => {
  const [foodVisible, setFoodVisible] = useState(false);
  const [percentage_count, setPercentageCount] = useState(
    (Number(localStorage.getItem("daily_calorie_count")) /
      Number(localStorage.getItem("daily_intake_calorie"))) *
      100
  );

  //launch function here :(
  const updateCounter = () => {
    setPercentageCount(
      (Number(localStorage.getItem("daily_calorie_count")) /
        Number(localStorage.getItem("daily_intake_calorie"))) *
        100
    );
  };

  const foodToggle = () => {
    setFoodVisible(!foodVisible);
  };

  if (!foodVisible) {
    return (
      <main>
        <Waves />
        <Navbar />
        <TodaysDate />
        <Calorie_counter
          percentage={Number.isNaN(percentage_count) ? 0 : percentage_count}
        />
        <Nutrients></Nutrients>
        <AddFood updateParent={updateCounter} clicked={foodToggle}></AddFood>
      </main>
    );
  } else {
    return <Foods clicked={foodToggle} />;
  }
};
export default Home;

//https://www.npmjs.com/package/@delowar/react-circle-progressbar

/*

    <button onClick={() => setCount(count + 1)} className="border-2">
        Click me
      </button>
*/
