import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store'
import { Task } from '../models';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export const selectAllTasks = (state: RootState) => state.task.tasks;
export const selectTaskById = (state: RootState, taskId: string) =>
  state.task.tasks.find(task => task.id === taskId);

export const taskReducer = taskSlice.reducer;
