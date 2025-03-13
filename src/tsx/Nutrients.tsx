import * as React from "react";
import { Component, useEffect, useState } from "react";
import Nutrient from "./Nutrient";
import carb_img from "../media/carb.svg";
import fat_img from "../media/fat.svg";
import protein_img from "../media/protein.svg";
const Nutrients = () => {
  const [nutriments, setNutriments]: any = useState([]);
  let nutrimentsArray: any = [];

  nutrimentsArray.push(
    //carb
    Math.round(
      (Number(localStorage.getItem("daily_carb_count")) /
        Number(localStorage.getItem("daily_intake_carb"))) *
        100
    )
  );
  nutrimentsArray.push(
    //fat
    Math.round(
      (Number(localStorage.getItem("daily_fat_count")) /
        Number(localStorage.getItem("daily_intake_fat"))) *
        100
    )
  );
  nutrimentsArray.push(
    //protein
    Math.round(
      (Number(localStorage.getItem("daily_protein_count")) /
        Number(localStorage.getItem("daily_intake_protein"))) *
        100
    )
  );

  useEffect(() => {
    setNutriments(nutrimentsArray);
  }, []);

  return (
    <div className="flex justify-center rounded-full p-0.5 nutrients_container absolute left-0 right-0 top-80 bottom-2 m-auto w-min h-min transform scale-110">
      <Nutrient img_src={carb_img} percentage={nutriments[0]}></Nutrient>
      <Nutrient img_src={fat_img} percentage={nutriments[1]}></Nutrient>
      <Nutrient img_src={protein_img} percentage={nutriments[2]}></Nutrient>
    </div>
  );
};
export default Nutrients;
