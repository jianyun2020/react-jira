import React from "react";
import ReactDOM from "react-dom/client";
import { server } from "./mock/server";
import "antd/dist/antd.less";
import { Button } from "antd";
import { User } from "types/user";
import styled from "@emotion/styled";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

server.start();

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

function App() {
  const token = getToken();

  function register() {
    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "bob", password: 123 }),
    }).then(async (response) => {
      if (response.ok) {
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(await response.json());
      }
    });
  }
  function projects() {
    fetch(`${apiUrl}/kanbans?projectId=1`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({personId: 2}),
    }).then(async (response) => {
      if (response.ok) {
        console.log(await response.json());
      } else {
        return Promise.reject(await response.json());
      }
    });
  }

  return (
    <Margin>
      <Button type="primary" onClick={register}>
        注册
      </Button>
      <Button type="primary" onClick={projects}>
        请求
      </Button>
    </Margin>
  );
}

const Margin = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 0.5rem;
  }
`;
