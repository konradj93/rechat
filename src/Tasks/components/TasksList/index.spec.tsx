import { render, screen } from '@testing-library/react';
import { TaskList } from './';
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

describe('TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the task list', () => {
    render(<TaskList />);

    const task1Title = screen.getByText('Task 1');
    const task2Title = screen.getByText('Task 2');
    const task1Description = screen.getByText('Description 1');
    const task2Description = screen.getByText('Description 2');

    expect(task1Title).toBeInTheDocument();
    expect(task2Title).toBeInTheDocument();
    expect(task1Description).toBeInTheDocument();
    expect(task2Description).toBeInTheDocument();
  });

  it('should render "You have nothing to do" message if there are no tasks', () => {
    mockTasks = [];

    render(<TaskList />);

    const messageElement = screen.getByText(
      'You have nothing to do. Go get some sleep.',
    );

    expect(messageElement).toBeInTheDocument();
  });
});
