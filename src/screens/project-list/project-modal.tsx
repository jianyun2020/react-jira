import { Button, Drawer } from "antd";
import { useProjectModal } from "utils/project";

export const ProjectModal = () => {
  const { projectModalOpen, close: closeModal } = useProjectModal();
  return (
    <Drawer onClose={closeModal} visible={projectModalOpen} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={closeModal}>关闭</Button>
    </Drawer>
  );
};
