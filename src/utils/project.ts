import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/utils";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-optoins";
import { isQueryKey } from "react-query/types/core/utils";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 编辑项目列表
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

// 添加项目列表
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 删除项目列表
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 获取project列表
export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id), // 或!!id
    }
  );
};
