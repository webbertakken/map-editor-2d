import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { Canvas } from "./components/canvas/Canvas";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Canvas />
  </React.StrictMode>
);
