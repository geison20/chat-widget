import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import ChatWidget from "./components/ChatWidget";

import "antd/dist/antd.css";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={ChatWidget} />
  </BrowserRouter>,
  document.getElementById("root")
);
