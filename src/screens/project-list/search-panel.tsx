// /** @jsx jsx */
// import { jsx } from "@emotion/react";
import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "../../types/projects";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/* setParam(Object.assign({}, param, {name: evt.target.value}))*/}
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
