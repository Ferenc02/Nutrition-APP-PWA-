import React, { Component, useEffect, useRef, useState } from "react";

interface Props {
  button?: Number;
  sendData?: any;
}
const Button = (props: Props) => {
  let render;

  const [downloadedApp, setDownloadedApp] = useState(true);
  let deferredPrompt: any;
  const add_button: any = useRef(null);

  useEffect(() => {
    add_button.current.addEventListener("click", () => {
      props.sendData(true);
    });
  }, []);
  /*
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    add_button.current.style.display = "block";

    //!important some reason it cant find the add_button :(
    if (window.matchMedia("(display-mode: standalone)").matches) {
    } else {
      add_button.current.addEventListener("click", () => {
        // hide our user interface that shows our A2HS button
        add_button.current.style.display = "none";
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    }
  });
*/
  return (
    <div>
      {
        <button
          ref={add_button}
          className="bg-white text-lg px-6 py-2 whitespace-nowrap shadow-none rounded-full no-hover-effect"
        >
          <span>{downloadedApp ? "Get Started!" : "Add to home screen"}</span>
        </button>
      }
    </div>
  );
};

export default Button;
