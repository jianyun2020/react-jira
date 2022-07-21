import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
// import { server } from "./mock/server";
import { AppProviders } from "context";
import "./App.css";
import "antd/dist/antd.less";
import { BrowserRouter } from "react-router-dom";

import { loadDevTools } from "jira-dev-tool";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadDevTools(() => {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppProviders>
            <App />
          </AppProviders>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

// server.start();
// server.start({
//   quiet: true,
//   serviceWorker: {
//     url: "/mockServiceWorker.js",
//   },
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
