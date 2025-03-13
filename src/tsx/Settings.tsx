import React, { Component, useState } from "react";

const Settings = (props: any) => {
  const [gender, setGender] = useState(1);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [activity, setActivity] = useState(1);

  let dailyIntakeCalorie = 0;

  let actiMultiDict: any = {
    "1": 1.2,
    "2": 1.375,
    "3": 1.55,
    "4": 1.725,
  };
  let actiProtDict: any = {
    "1": 0.8,
    "2": 0.9,
    "3": 0.9,
    "4": 1.0,
  };
  let actiCarbDict: any = {
    "1": "225",
    "2": "255",
    "3": "295",
    "4": "325",
  };

  let years: any = [];
  for (let i = 13; i < 150; i++) {
    years.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  const WriteToLocalStorage = () => {
    switch (Number(gender)) {
      case 1:
        //Male
        dailyIntakeCalorie = Math.round(
          (10 * weight + 6.25 * height - 5 * age + 5) * actiMultiDict[activity]
        );
        //alert(dailyIntakeCalorie);
        break;

      case 2:
        //Female
        dailyIntakeCalorie = Math.round(
          (10 * weight + 6.25 * height - 5 * age - 161) *
            actiMultiDict[activity]
        );
        //alert(dailyIntakeCalorie);
        break;

      case 3:
        //Unidentified
        dailyIntakeCalorie = Math.round(
          ((10 * weight + 6.25 * height - 5 * age + 5) *
            actiMultiDict[activity] +
            (10 * weight + 6.25 * height - 5 * age - 161) *
              actiMultiDict[activity]) /
            2
        );
        //This equation is (daily intake male + daily intake female)/2
        //alert(dailyIntakeCalorie);
        break;

      default:
        alert("Please select your gender :)");
        break;
    }
    if (weight != 0 || height != 0) {
      localStorage.setItem(
        "daily_intake_calorie",
        dailyIntakeCalorie.toString()
      );
      localStorage.setItem("daily_intake_carb", actiCarbDict[activity]);
      localStorage.setItem(
        "daily_intake_fat",
        Math.round((dailyIntakeCalorie * 0.3) / 9).toString()
      );
      localStorage.setItem(
        "daily_intake_protein",
        Math.round(weight * actiProtDict[activity]).toString()
      );

      props.sendSubmitedData(true);
    } else {
      alert("Please fill out all the forms :)");
    }
  };

  return (
    <div className="w-screen relative">
      <nav className="navbar w-screen p-8"></nav>

      <div className="box-content p-8 inset-0 m-auto h-min w-fit">
        <div className="text-2xl mb-8">Enter Information</div>
        <div className="my-2 w-full">
          <p className="text-sm pb-2 text-gray-600">WEIGHT</p>
          <div className="flex w-full font-light border-b-2 transition-colors border-gray-300 hover:border-green-300 focus:border-green-300 ">
            <input
              type="number"
              placeholder="65"
              className="no-hover-effect w-full p-2"
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <div className="p-2 text-gray-400">kg</div>
          </div>
        </div>
        <div className="my-2 w-full">
          <p className="text-sm py-2 text-gray-600">HEIGHT</p>
          <div className="flex w-full font-light  border-b-2 transition-colors border-gray-300 hover:border-green-300 focus:border-green-300">
            <input
              type="number"
              placeholder="172"
              className="no-hover-effect w-full p-2"
              onChange={(event) => setHeight(Number(event.target.value))}
            />
            <div className="p-2 text-gray-400">cm</div>
          </div>
        </div>
        <p className="text-sm py-2 mt-2 text-gray-600">GENDER</p>
        <select
          name="Gender"
          className="bg-white w-full py-3  border-b-2 transition-colors border-gray-300 hover:border-green-300 focus:border-green-300 text-gray-600"
          value={gender}
          onChange={(e: any) => setGender(e.target.value)}
        >
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Rather not disclose</option>
        </select>
        <p className="text-sm py-2 mt-2 text-gray-600">AGE</p>
        <select
          name="Age"
          className="bg-white w-full py-3  border-b-2 transition-colors border-gray-300 hover:border-green-300 focus:border-green-300 text-gray-600"
          value={age}
          onChange={(e: any) => setAge(e.target.value)}
        >
          {years}
        </select>
        <p className="text-sm py-2 mt-2 text-gray-600">ACTIVITY</p>
        <select
          name="Activity"
          className="bg-white w-full py-3  border-b-2 transition-colors border-gray-300 hover:border-green-300 focus:border-green-300 text-gray-600"
          value={activity}
          onChange={(e: any) => setActivity(e.target.value)}
        >
          <option value="1">Sedentary (little or no exercise)</option>
          <option value="2">Lightly active (exercise 1-3 days/week)</option>
          <option value="3">Moderately active (exercise 3-5 times/week)</option>
          <option value="4">Very active (exercise 6-7times/week)</option>
        </select>
        <button
          className="p-3 mt-24 w-full navbar rounded-full text-white text-lg"
          onClick={WriteToLocalStorage}
          value="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Settings;

//https://www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf
