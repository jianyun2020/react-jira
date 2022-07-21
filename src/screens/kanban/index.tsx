import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { KanbanColumn } from "./kanban-column";
import { useKanbansInProject, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbansInProject();

  return (
    <div>
      <h1>{currentProject?.name}</h1>
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
