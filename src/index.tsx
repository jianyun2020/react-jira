import React from "react";
import ReactDOM from "react-dom";
import { loadServer, DevTools } from "jira-dev-tool";
import "antd/dist/antd.less";
// 务必在jira-dev-tool之后引入

import App from "./App";
import { AppProviders } from "context";

loadServer(() => {
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>,
    document.getElementById("root")
  );
});
