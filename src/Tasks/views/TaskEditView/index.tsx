import { useNavigate, useParams } from 'react-router-dom';
import { BaseLayout } from '../../../Common/views/BaseLayout/BaseLaout';
import { EditTaskForm } from '../../components/EditTaskForm';
import { CircularProgress } from '@mui/material';
import { useTaskContext } from '../../context';

export const TaskEditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskContext();

  const task = tasks.find((el) => el.id === id);
  if (!task) return <CircularProgress />;
  return (
    <BaseLayout>
      <EditTaskForm task={task} onCancel={() => navigate('/')} />
    </BaseLayout>
  );
};
