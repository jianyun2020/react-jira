import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "", // 搜索框的值
    personId: "", // 下拉选项的id
  });
  const [users, setUsers] = useState([]); // 存储下拉菜单的用户列表
  const [list, setList] = useState([]); // 存储获取的表单数据
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  // 当用户输入或选择下拉框的时候，要请求列表
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  // 初始化users列表
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
