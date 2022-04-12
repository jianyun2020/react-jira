import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

// 获取看板列表的Hook
export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
