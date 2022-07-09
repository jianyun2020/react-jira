import { useState, useEffect } from "react";
import * as qs from "qs";

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "", // 搜索框的值
    personId: "", // 下拉选项的id
  });

  const [users, setUsers] = useState([]); // 存储下拉菜单的用户列表

  const [list, setList] = useState([]); // 存储获取的表单数据

  const apiUrl = process.env.REACT_APP_API_URL;

  const debouncedParam = useDebounce(param, 200);
  // 当用户输入或选择下拉框的时候，要请求列表
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam, apiUrl]);

  // 初始化users列表
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
