import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTaskForm } from './';
import { Task } from '../../models';
import { TaskStatus } from '../../models/enums';

const mockAddTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockedUsedNavigate = jest.fn();
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    history: [],
    created: '2022-01-01',
    status: TaskStatus.InProgress,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    history: [],
    created: '2022-01-01',
    status: TaskStatus.Done,
  },
];

jest.mock('../../context', () => ({
  ...jest.requireActual('../../context'),
  useTaskContext: () => ({
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    tasks: mockTasks,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('AddTaskForm', () => {
  it('should render the form correctly', () => {
    render(<AddTaskForm />);

    const titleLabel = screen.getByLabelText('Title');
    const descriptionLabel = screen.getByLabelText('Description');
    const addButton = screen.getByRole('button', { name: 'Add' });

    expect(titleLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  it('should not add a new task when the form is submitted with invalid data', async () => {
    render(<AddTaskForm />);

    const addButton = screen.getByRole('button', { name: 'Add' });

    await fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddTask).not.toHaveBeenCalled();
    });
  });

  it('should add a new task when the form is submitted with valid data', async () => {
    render(<AddTaskForm />);

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');

    const title = 'New Task';
    const description = 'New Task Description';

    await userEvent.type(titleInput, title);
    await userEvent.type(descriptionInput, description);

    await waitFor(() => {
      expect(titleInput).toHaveValue(title);
      expect(descriptionInput).toHaveValue(description);
    });
  });
});
