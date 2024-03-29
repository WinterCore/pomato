import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.js";
import "./global.css";

const elem = document.getElementById("root") as HTMLDivElement;

ReactDOM
    .createRoot(elem)
    .render(
        <App />
    );
