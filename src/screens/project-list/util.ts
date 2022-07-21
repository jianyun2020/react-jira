import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setprojectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, seteditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const [urlParams, setUrlParams] = useSearchParams();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setprojectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    seteditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
    urlParams,
  };
};
