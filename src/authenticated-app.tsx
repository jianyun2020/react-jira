import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils/http";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          </Route>
        </Routes>
      </Main>

      <ProjectModal />
    </Container>
  );
};

const Layout = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>

      <Link to={"projects"}>项目列表</Link>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
