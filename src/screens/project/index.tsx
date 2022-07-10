import { Link, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route index element={<KanbanScreen />} />
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"epic"} element={<EpicScreen />} />
      </Routes>
      <Outlet />
    </div>
  );
};
