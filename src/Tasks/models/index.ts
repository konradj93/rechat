import { TaskStatus } from './enums';
export interface TaskBase {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created: string;
}
export interface Task extends TaskBase {
  history?: TaskDiff[];
}

export interface TaskDiff
  extends Partial<Pick<TaskBase, 'title' | 'description' | 'status'>> {
  changed: string;
}
