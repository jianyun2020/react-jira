import React from "react";
import ReactDOM from "react-dom";
import { loadDevTools } from "jira-dev-tool";
import App from "./App";
import { AppProviders } from "context";

loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById("root")
  );
});
