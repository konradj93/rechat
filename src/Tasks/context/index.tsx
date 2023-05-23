import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from '../models/enums';
import { Task } from '../models';

interface TasksContextValue {
  tasks: Task[];
  addTask: ({
    title,
    description,
  }: Pick<Task, 'title' | 'description'>) => void;
  updateTask: (updatedTask: Task) => void;
}

const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
});

export const useTaskContext = () => useContext(TasksContext);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = ({
    title,
    description,
  }: Pick<Task, 'title' | 'description'>) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.ToDo,
      created: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    const { id, title, description, status } = updatedTask;
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
            description,
            status,
          };
        }
        return task;
      }),
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
};
