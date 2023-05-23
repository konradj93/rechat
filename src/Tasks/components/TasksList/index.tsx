import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../../App/hooks/redux';
import { selectAllTasks } from '../../store';
import { SingleTask } from '../SingleTask';
import { Task } from '../../models';

const BORDER_RADIUS_VALUE = '32px';

const renderTaskList = (tasks: Task[]) =>
  tasks.length > 0 ? (
    <>
      {tasks?.map((task) => (
        <SingleTask key={task.id} task={task} />
      ))}
    </>
  ) : (
    <Typography variant="h4">
      You have nothing to do. Go get some sleep.
    </Typography>
  );

export const TaskList = () => {
  const tasks = useAppSelector(selectAllTasks);
  return (
    <Box
      bgcolor="primary.dark"
      sx={{
        borderTopLeftRadius: BORDER_RADIUS_VALUE,
        borderTopRightRadius: BORDER_RADIUS_VALUE,
        marginTop: '40px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography
        variant="h5"
        component="h5"
        color="primary.contrastText"
        padding={3}>
        Tasks
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        sx={{
          backgroundColor: 'primary.light',
          borderTopLeftRadius: BORDER_RADIUS_VALUE,
          borderTopRightRadius: BORDER_RADIUS_VALUE,
          overflowY: 'auto',
          padding: '16px',
          flex: 1,
        }}>
        {renderTaskList(tasks)}
      </Grid>
    </Box>
  );
};
