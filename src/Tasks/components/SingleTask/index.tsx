import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { TaskBase } from '../../models';
import { useNavigate } from 'react-router-dom';
import { TaskStatusSelectButton } from '../TaskStatusSelectButton';

interface SingleTaskProp {
  task: TaskBase;
}

export const SingleTask: FC<SingleTaskProp> = ({ task }) => {
  const { title, description } = task;

  const navigate = useNavigate();

  return (
    <Box width={240} p={1}>
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" noWrap gutterBottom>
              {title}
            </Typography>
            <Typography
              paragraph
              sx={{
                height: '4.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
              {description}
            </Typography>
            <CardActions
              sx={{
                justifyContent: 'space-between',
                padding: 0,
              }}>
              <TaskStatusSelectButton task={task} />
              <IconButton
                aria-label="edit"
                size="large"
                sx={{
                  color: 'primary.dark',
                }}
                onClick={() => {
                  navigate(`/task/${task.id}`);
                }}>
                <BorderColorIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};
