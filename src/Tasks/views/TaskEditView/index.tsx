import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../App/hooks/redux';
import { BaseLayout } from '../../../Common/views/BaseLayout/BaseLaout';
import { EditTaskForm } from '../../components/EditTaskForm';
import { selectTaskById } from '../../store';
import { CircularProgress } from '@mui/material';

export const TaskEditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useAppSelector((state) => selectTaskById(state, id));
  if (!task) return <CircularProgress />;
  return (
    <BaseLayout>
      <EditTaskForm task={task} onCancel={() => navigate('/')} />
    </BaseLayout>
  );
};
