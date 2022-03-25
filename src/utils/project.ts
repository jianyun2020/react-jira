import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
