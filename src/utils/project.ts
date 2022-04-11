import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param]);

  return result;
};

// 编辑项目列表
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...asyncResult };
};

// 添加项目列表
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`project/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncResult };
};
