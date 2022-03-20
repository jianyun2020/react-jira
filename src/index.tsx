import React from "react";
import ReactDOM from "react-dom";
import { loadDevTools } from "jira-dev-tool";
import App from "./App";

loadDevTools(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
