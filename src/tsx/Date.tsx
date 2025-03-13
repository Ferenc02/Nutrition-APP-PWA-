import * as React from "react";
import { Component } from "react";

const date = new Date();
const TodaysDate = () => {
  if (localStorage.getItem("date_today") !== getDate()) {
    localStorage.setItem("daily_calorie_count", "0");
    localStorage.setItem("daily_carb_count", "0");
    localStorage.setItem("daily_protein_count", "0");
    localStorage.setItem("daily_fat_count", "0");
  }
  localStorage.setItem("date_today", getDate());
  return (
    <div>
      <div className="text-3xl montserrat text-gray-500 mt-8 p-5">
        {getDayInString()}
        <br />
        <p className="text-xl text-black font-bold">{getDate()}</p>
      </div>
    </div>
  );
};

const getDayInString = () => {
  let day;
  switch (date.getUTCDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "No day of the week found :(";
  }
  return day;
};
//FIX THIS
const getDate = () => {
  let dateToday = date.toUTCString();
  let dateTodayArray = dateToday.split(" ");
  dateTodayArray = dateTodayArray.slice(1, dateTodayArray.length);
  return `${dateTodayArray[1]} ${dateTodayArray[0]}, ${dateTodayArray[2]}`;
};
export default TodaysDate;
