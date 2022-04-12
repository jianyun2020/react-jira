import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Row, Typography } from "antd";
import { useProjectsSearchParams } from "./utils";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
  const dispatch = useDispatch();
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type="link"
        >
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
