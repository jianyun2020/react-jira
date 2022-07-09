import { userHandlers } from "./account";
import { getRestHandlers } from "./rest-handlers";
import {
  epicDB,
  kanbanDB,
  projectDB,
  tagDB,
  taskDB,
  taskTypeDB,
  userDB,
} from "../data/rest";
import { reorderHandlers } from "./reorder-handlers";

export const handlers = [
  ...userHandlers,
  ...getRestHandlers("projects", projectDB),
  ...getRestHandlers("epics", epicDB),
  ...getRestHandlers("tasks", taskDB),
  ...getRestHandlers("kanbans", kanbanDB),
  ...getRestHandlers("persons", userDB),
  ...getRestHandlers("taskTypes", taskTypeDB),
  ...getRestHandlers("tags", tagDB),
  ...getRestHandlers("users", userDB),
  ...reorderHandlers,
];
