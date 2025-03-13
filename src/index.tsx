import React from "react";
import ReactDOM from "react-dom";
import App from "./tsx/App";
import "./css/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();

reportWebVitals();

/*
https://create-react-app.dev/docs/making-a-progressive-web-app/
*/
//just a test
