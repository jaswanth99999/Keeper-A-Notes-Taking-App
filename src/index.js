import React from "react";
import ReactDOM from "react-dom";
import Keeper from "./keeper.js";
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./Counters/AuthContext.js";


ReactDOM.render(<BrowserRouter><AuthProvider><Keeper /></AuthProvider></BrowserRouter>, document.getElementById("root"));

