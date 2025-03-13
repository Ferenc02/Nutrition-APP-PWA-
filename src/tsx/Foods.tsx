import * as React from "react";
import { Component, useState } from "react";
import arrow_left_image from "../media/arrow_left.svg";
import sad_image from "../media/sad.svg";
import plusSignWhite from "../media/plus_sign_white.svg";
import plusSign from "../media/plus.svg";
import Scanner from "./Scanner";
const Foods = (props: any) => {
  let render;
  const [barcodes] = useState(
    localStorage.getItem("barcodes") === null
      ? ""
      : localStorage.getItem("barcodes")
  );
  const [clicked, setClicked] = useState(false);
  const [scanned, setScanner] = useState(false);
  const [scanFinished, setScanState] = useState(false);
  const [number_of_servings, setNumber_of_servings] = useState(1);
  const [servings, setServings] = useState(100);

  const clickedLoadedFood = (value: any) => {
    console.log(value);
    localStorage.setItem("current_food", localStorage.getItem(value) || "");
    setScanner(true);
    setScanState(true);
  };

  const getData = () => {
    setScanner(true);
    setClicked(false);
  };
  const getScanState = () => {
    setScanState(true);
  };
  const startScanner = () => {
    setClicked(true);
    setScanner(false);
  };
  const loadLoadedFoods = () => {
    let barcodes_array = barcodes === null ? "," : barcodes.split(",");
    let loadedFoodsJsx = [];

    for (let i = 0; i < barcodes_array?.length - 1; i++) {
      loadedFoodsJsx.push(
        <button
          className="food_container w-full hover:bg-gray-100 focus:bg-gray-100 transition-colors"
          key={barcodes_array[i]}
          onClick={() => clickedLoadedFood(barcodes_array[i])}
        >
          <div className="p-4 text-sm text-left">
            <p>
              {
                JSON.parse(localStorage.getItem(barcodes_array[i]) || "{}")
                  .product.product_name
              }
            </p>
          </div>
          <hr />
        </button>
      );
    }
    // return jsx;
    return loadedFoodsJsx;
  };

  const addData = () => {
    let daily_calorie_count: Number = Number(
      localStorage.getItem("daily_calorie_count")
    );
    let daily_carb_count: Number = Number(
      localStorage.getItem("daily_carb_count")
    );
    let daily_fat_count: Number = Number(
      localStorage.getItem("daily_fat_count")
    );
    let daily_protein_count: Number = Number(
      localStorage.getItem("daily_protein_count")
    );
    let json: any = JSON.parse(localStorage.getItem("current_food") || "{}");

    //! when kcal not found use kj and convert to kcal
    let amountOfConsumedCalories: any = Number(
      ((json["product"]["nutriments"]["energy_100g"] * 0.2388) / 100) *
        number_of_servings *
        servings
    );
    let amountOfConsumedCarb: any = Number(
      (json["product"]["nutriments"]["carbohydrates_100g"] / 100) *
        number_of_servings *
        servings
    );
    let amountOfConsumedFat: any = Number(
      (json["product"]["nutriments"]["fat_100g"] / 100) *
        number_of_servings *
        servings
    );
    let amountOfConsumedProtein: any = Number(
      (json["product"]["nutriments"]["proteins_100g"] / 100) *
        number_of_servings *
        servings
    );
    localStorage.setItem(
      "daily_calorie_count",
      daily_calorie_count + amountOfConsumedCalories
    );
    localStorage.setItem(
      "daily_carb_count",
      daily_carb_count + amountOfConsumedCarb
    );

    localStorage.setItem(
      "daily_fat_count",
      daily_fat_count + amountOfConsumedFat
    );
    localStorage.setItem(
      "daily_protein_count",
      daily_protein_count + amountOfConsumedProtein
    );

    props.clicked();
  };
  if (scanned && scanFinished) {
    let currentFood = JSON.parse(localStorage.getItem("current_food") || "{}");
    //fires more than once?
    //alert("reading food now");
    render = (
      <div className="w-full h-full bg-white absolute">
        <nav className="w-full p-4 navbar flex shadow-md fixed items-center justify-center">
          <button onClick={props.clicked}>
            <img src={arrow_left_image} alt="arrow icon" />
          </button>
          <p className="m-auto text-white text-lg w-fit">Add Food</p>
          <button
            className="flex justify-center items-center"
            onClick={addData}
          >
            <img src={plusSignWhite} alt="plus sign white" />
          </button>
        </nav>
        <div className="mt-16">
          <p className="p-4 font-bold text-lg">{`${
            currentFood.product.product_name == undefined
              ? ""
              : currentFood.product.product_name
          } (${currentFood.product.brands})`}</p>
        </div>
        <hr />
        <button
          className="p-4 flex justify-between w-full text-xs"
          onClick={() =>
            setNumber_of_servings(Number(prompt("Number of servings")))
          }
        >
          <p>Number of Servings</p>
          <p className="text-green-400">{number_of_servings}</p>
        </button>
        <hr />
        <button
          className="p-4 flex justify-between w-full text-xs"
          onClick={() => setServings(Number(prompt("Serving Size")))}
        >
          <p>Serving Size</p>
          <p className="text-green-400">{servings}g</p>
        </button>
        <hr />
      </div>
    );
  } else {
    //fix this somehow
    if (clicked && !scanned) {
      return <Scanner sendData={getData} sendScanState={getScanState} />;
    } else {
      return (
        <div className="w-full h-full bg-white absolute fade-in">
          <nav className="w-full p-5 navbar flex shadow-md fixed">
            <button onClick={props.clicked}>
              <img src={arrow_left_image} alt="" />
            </button>

            <p className="m-auto absolute text-white text-xl right-0 left-0 w-fit">
              Add Food
            </p>
          </nav>
          <section className="mt-16">
            {barcodes === "" ? (
              <div className="inset-0 w-fit absolute m-auto h-min">
                <img src={sad_image} alt="sad face :(" />
                <p className="text-center text-green-400 text-xl p-2 font-light">
                  NO FOOD FOUND
                </p>
              </div>
            ) : (
              <div>{loadLoadedFoods().map((element) => element)}</div>
            )}
          </section>
          <button
            onClick={startScanner}
            className="fixed right-0 bottom-0 mr-4 mb-5 bg-white flex justify-center items-center rounded-full p-5 shadow-lg"
          >
            <img src={plusSign} alt="plus sign" />
          </button>
        </div>
      );
    }
  }
  return <div>{render}</div>;
};
export default Foods;
