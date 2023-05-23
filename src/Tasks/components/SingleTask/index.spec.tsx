import { render, screen, fireEvent } from '@testing-library/react';
import { SingleTask } from '.';
import { TaskStatus } from '../../models/enums';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: TaskStatus.ToDo,
  created: '2023-05-23T12:00:00Z',
  history: [],
};

describe('SingleTask', () => {
  it('should render task title and description', () => {
    render(<SingleTask task={mockTask} />);

    const titleElement = screen.getByText('Test Task');
    const descriptionElement = screen.getByText('Test Description');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should navigate to edit task page on edit button click', () => {
    render(<SingleTask task={mockTask} />);

    const editButton = screen.getByLabelText('edit');
    fireEvent.click(editButton);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/1/edit');
  });
});
