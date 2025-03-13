import * as React from "react";
import { Component, useEffect, useState } from "react";
import plusSign from "../media/plus.svg";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Scanner from "./Scanner";
import Foods from "./Foods";

const AddFood = (props: any) => {
  const [clicked, setClicked] = useState(false);
  let getData = () => {
    // do not forget to bind getData in constructor
    setClicked(getData !== Function ? false : true);
  };

  if (clicked) {
    props.clicked();
    /*
    return (
      /*
      <div>
        <div className="w-full  m-auto absolute inset-0" id="camera_container">
          <Scanner close={clicked} sendData={getData} />
        </div>
      </div>
    );*/
    return <div></div>;
  } else {
    props.updateParent();
    return (
      <button
        onClick={() => setClicked(true)}
        className="absolute right-0 bottom-0 mr-4 mb-5 bg-white flex justify-center items-center rounded-full p-5 shadow-lg"
      >
        <img src={plusSign} alt="plus sign" />
      </button>
    );
  }
};
export default AddFood;

/*
 <>
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err: any, result: any) => {
              if (result) setData(result.text);
              else setData("Not Found");
              console.log(err);
            }}
          />
          <p>{data}</p>
          <p>{error}</p>
        </>*/

////https://www.cluemediator.com/barcode-scanner-in-react
