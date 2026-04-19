import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import "./index.css";
import outputs from "../amplify_outputs.json";

if (outputs) {
  Amplify.configure(outputs);
}
else {
  console.error("Amplify outputs not found. Please ensure amplify_outputs.json is generated and contains the necessary configuration.");
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
