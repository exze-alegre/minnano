// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; // Make sure this is importing App correctly

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This should match the div id in your public/index.html
);
