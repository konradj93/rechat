import { useNavigate, useParams } from 'react-router-dom';
import { BaseLayout } from '../../../Common/views/BaseLayout/BaseLaout';
import { EditTaskForm } from '../../components/EditTaskForm';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTaskContext } from '../../context';

export const TaskEditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskContext();

  const task = tasks.find((el) => el.id === id);
  if (!task) return <CircularProgress />;
  return (
    <BaseLayout>
      <Container maxWidth="md" style={{ marginTop: '32px' }}>
        <EditTaskForm task={task} backAction={() => navigate('/')} />
        <Accordion style={{ marginTop: '32px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>View history</Typography>
          </AccordionSummary>
          <AccordionDetails>{JSON.stringify(task.history)}</AccordionDetails>
        </Accordion>
      </Container>
    </BaseLayout>
  );
};
