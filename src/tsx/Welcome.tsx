import { useEffect, useState } from "react";
import Button from "./Button";
import Settings from "./Settings";
import Waves from "./Waves";
const Welcome = (props: any) => {
  //This has to be false
  const [getSendForward, setSendForward] = useState(false);
  const [submitedForm, setSubmitedForm] = useState(false);
  const [mobileDetected, setMobileDetected] = useState(false);
  let getData = (val: any) => {
    // do not forget to bind getData in constructor
    setSendForward(val);
  };

  let getSubmitedData = (val: any) => {
    props.sendSubmitedData(val);
  };

  function detectMob() {
    if (window.innerWidth >= 800) {
      alert("Please use your phone for this application");
      document.body.remove();
    }
  }
  useEffect(() => {
    detectMob();
  }, []);

  return (
    <main>
      {getSendForward ? (
        <Settings sendSubmitedData={getSubmitedData} />
      ) : (
        <div>
          <Waves />
          <div className="flex items-center absolute top-10 inset-0 w-min min-h m-auto">
            <div className="flex items-center flex-col">
              <p className="montserrat font-medium text-5xl mb-10">Welcome!</p>
              <div className="bg-gradient-to-r from-yellow-400 to-green-400 rounded-full shadow-lg p-1 button-border">
                <Button button={0} sendData={getData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default Welcome;

//Calorie Formula
//https://www.verywellfit.com/how-many-calories-do-i-need-each-day-2506873
