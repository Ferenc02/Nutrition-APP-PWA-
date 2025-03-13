import React, { useEffect, useRef, useState } from "react";
import plusSign from "../media/plus.svg";
const Quagga = require("quagga");
import arrow_left_image from "../media/arrow_left.svg";
import camera_switch from "../media/camera_switch.svg";

const Scanner = (props: any) => {
  const firstUpdate = useRef(false);
  const [isStart, setIsStart] = useState(true);
  const [face, setFace] = useState("user"); //environment
  let detectionHash: any = {};

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isStart) startScanner(face);
    else stopScanner();
  }, [isStart]);

  const barcodeExists = (barcode: Number) => {
    return localStorage.getItem(barcode.toString()) === null ? false : true;
  };

  const _onDetected = (res: any) => {
    // stopScanner();
    //barcodes.push(res.codeResult.format + " : " + res.codeResult.code);
    detectionHash[res.codeResult.code] =
      detectionHash[res.codeResult.code] === undefined
        ? 0
        : (detectionHash[res.codeResult.code] += 1);
    // setBarcode(res.codeResult.code);
    if (detectionHash[res.codeResult.code] >= 5) {
      let addFoodToDatabase = (value: any) => {
        let food = window.localStorage.getItem(res.codeResult.code)?.toString();
        if (food === undefined) {
          food = "undefined";
        }
        let json = JSON.parse(food);
        //! remove this when viggo has finished his daily intake
        /*localStorage.setItem("daily_intake_calorie", "2950");
        localStorage.setItem("daily_intake_carb", "325");
        localStorage.setItem("daily_intake_fat", "77");
        localStorage.setItem("daily_intake_protein", "56");*/

        if (localStorage.getItem("daily_calorie_count") === null) {
          localStorage.setItem("daily_calorie_count", "0");
        }
        if (localStorage.getItem("daily_carb_count") === null) {
          localStorage.setItem("daily_carb_count", "0");
        }
        if (localStorage.getItem("daily_fat_count") === null) {
          localStorage.setItem("daily_fat_count", "0");
        }
        if (localStorage.getItem("daily_protein_count") === null) {
          localStorage.setItem("daily_protein_count", "0");
        }
        //!----------------------------------------------

        let dailyIntake: Number = Number(
          localStorage.getItem("daily_intake_calorie")
        );

        dailyIntake;

        localStorage.setItem("current_food", JSON.stringify(value));
        alert("added food to database");
        props.sendScanState(true);
      };
      //!This fires only when it has found 5 of the same barcode :D
      detectionHash = [];
      let foodInDatabase =
        localStorage.getItem(res.codeResult.code) === null ? false : true;

      if (!foodInDatabase) {
        fetchNutritionalFactsJSON(res.codeResult.code).then(
          (nutritional_facts) => {
            // alert("fetching food from api");
            if (nutritional_facts.product.product_name !== undefined) {
              if (!barcodeExists(res.codeResult.code)) {
                window.localStorage.setItem(
                  "barcodes",
                  window.localStorage.getItem("barcodes") === null
                    ? `${res.codeResult.code},`
                    : `${
                        window.localStorage.getItem("barcodes") +
                        res.codeResult.code
                      },`
                );
              }

              window.localStorage.setItem(
                res.codeResult.code,
                JSON.stringify(nutritional_facts)
              );
              addFoodToDatabase(nutritional_facts);
            } else {
              alert("food not found :(");
            }
          }
        );
        stopScanner();
      } else {
        addFoodToDatabase(
          JSON.parse(localStorage.getItem(res.codeResult.code) || "{}")
        );
        stopScanner();
      }
    }
  };
  async function fetchNutritionalFactsJSON(barcode: Number) {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode.toString()}.json`
    );
    const nutritional_facts = await response.json();
    return nutritional_facts;
  }
  const startScanner = (facingMode: String) => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: facingMode,
            // or user
          },
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        //!VERY IMPORTANT
        freqency: 20,
        debug: {
          drawBoundingBox: true,
          showFrequency: false,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: "small", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: true,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: true,
            },
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err: any) => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
    props.sendData(false);
  };
  const stopScannerWithoutGoingBack = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };
  const switch_camera = () => {
    //!Fires the same thing?
    //!grape cant scan throwing error FIX THAT
    setFace(face === "user" ? "environment" : "user");
    stopScannerWithoutGoingBack();
    startScanner(face);
  };
  return (
    <div className="flex flex-col">
      <nav className="w-full p-4 navbar flex shadow-md items-center justify-center">
        <button onClick={() => setIsStart((prevStart) => !prevStart)}>
          <img src={arrow_left_image} alt="arrow icon" />
        </button>
        <p className="m-auto text-white text-lg w-fit">Scan Barcode</p>
        <button
          className="flex justify-center items-center"
          onClick={switch_camera}
        >
          <img src={camera_switch} alt="plus sign white" />
        </button>
      </nav>
      <div id="scanner-container" className="flex"></div>
    </div>
  );
};

export default Scanner;

//https://www.cluemediator.com/barcode-scanner-in-react
//instascan?
