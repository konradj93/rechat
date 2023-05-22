import { RouteItem } from "../../Common/models";
import { TaskInitialView } from "../views/TaskinitialView";

export const TASKS_ROUTES: RouteItem[] = [
    { path: '/', component: <TaskInitialView /> },
  ];