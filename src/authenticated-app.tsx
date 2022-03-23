import styled from "@emotion/styled";
import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h2>logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button type="primary" danger onClick={logout}>
            登出
          </Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

/**
 * Gird和Flex各自的应用场景
 * 1. 要考虑，是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用gird
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发（用flex）：先有一组内容（数量一般不固定),然后希望它们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发（用grid）：先规划网格（数量一般比较固定），然后再把元素往里填充
 */

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main``;
