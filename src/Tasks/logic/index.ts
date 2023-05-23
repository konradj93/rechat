import { TaskStatus } from '../models/enums';

export const getAvailableStatuses = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ToDo:
      return [TaskStatus.ToDo, TaskStatus.InProgress];
    case TaskStatus.InProgress:
      return [TaskStatus.InProgress, TaskStatus.Blocked, TaskStatus.InQA];
    case TaskStatus.Blocked:
      return [TaskStatus.Blocked, TaskStatus.ToDo];
    case TaskStatus.InQA:
      return [TaskStatus.InQA, TaskStatus.ToDo, TaskStatus.Done];
    case TaskStatus.Done:
      return [TaskStatus.Done, TaskStatus.Deployed];
    case TaskStatus.Deployed:
      return [TaskStatus.Deployed];
    default:
      const value: never = status;
      throw Error(`Unhendled action type, ${value}`);
  }
};
