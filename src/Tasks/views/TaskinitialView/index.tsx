import { BaseLayout } from '../../../Common/views/BaseLayout/BaseLaout';
import { AddTaskForm } from '../../components/AddTaskForm';
import { TaskList } from '../../components/TasksList';

export const TaskInitialView = () => {
  return (
    <BaseLayout>
      <AddTaskForm />
      <TaskList />
    </BaseLayout>
  );
};
