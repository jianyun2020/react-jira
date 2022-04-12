import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Row, Typography } from "antd";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ButtonNoPadding } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  const { open } = useProjectModal();

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
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
