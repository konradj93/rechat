import { renderHook, act, waitFor } from '@testing-library/react';
import { SelectChangeEvent } from '@mui/material';
import { useHandleTaskStatusSelectButton } from '../useHandleTaskStatusSelectButton';
import { Task } from '../../models';
import { TaskStatus } from '../../models/enums';

const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockedUsedNavigate = jest.fn();
let mockTask: Task = {
  id: '1',
  title: 'Task 1',
  description: 'Description 1',
  history: [],
  created: '2022-01-01',
  status: TaskStatus.InProgress,
};

jest.mock('../../context', () => ({
  ...jest.requireActual('../../context'),
  useTaskContext: () => ({
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    tasks: [mockTask],
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('useHandleTaskStatusSelectButton', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useHandleTaskStatusSelectButton(mockTask),
    );

    expect(result.current.status).toBe(TaskStatus.InProgress);
    expect(result.current.userChangingStatus).toBe(false);
  });

  test('should update task status and set userChangingStatus to false on status change', async () => {
    const { result } = renderHook(() =>
      useHandleTaskStatusSelectButton(mockTask),
    );

    const newStatus = TaskStatus.Done;
    const event = {
      target: { value: newStatus },
    };

    act(() => {
      result.current.onStatusChange(event as SelectChangeEvent<TaskStatus>);
    });

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith({
        ...mockTask,
        status: newStatus,
      });
      expect(result.current.userChangingStatus).toBe(false);
    });
  });

  test('should set userChangingStatus to false when clicking outside the select', async () => {
    const { result } = renderHook(() =>
      useHandleTaskStatusSelectButton(mockTask),
    );

    const mockClickEvent = new MouseEvent('click', { bubbles: true });

    act(() => {
      result.current.setUserIsChangingStatus(true);
    });

    act(() => {
      result.current.handleClickOutsideSelect(mockClickEvent);
    });

    await waitFor(() => {
      expect(result.current.userChangingStatus).toBe(false);
    });
  });
});
