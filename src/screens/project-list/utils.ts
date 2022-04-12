import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 默认param中的personId是string类型，需要转换成number类型
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };

  /**
   * 三个以下可以用数组
   * return [
   *  projectCreate === 'true',
   *  open,
   *  close,
   * ] as const // 作为元组tuple，取值时可以重命名
   */
};
