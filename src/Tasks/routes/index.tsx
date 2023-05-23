import { RouteItem } from '../../Common/models';
import { TaskEditView } from '../views/TaskEditView';
import { TaskInitialView } from '../views/TaskinitialView';

export const TASKS_ROUTES: RouteItem[] = [
  { path: '/', component: <TaskInitialView /> },
  { path: '/:id/edit', component: <TaskEditView /> },
];
