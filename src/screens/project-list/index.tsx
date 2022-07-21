import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Button } from "antd";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, Row, ScreenContainer } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open: openModal } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <Button onClick={openModal}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List
        setProjectModalOpen={openModal}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
