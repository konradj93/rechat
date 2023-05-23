import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import * as yup from 'yup';
import { useAppDispatch } from '../../../App/hooks/redux';
import { updateTask } from '../../store';
import { Task } from '../../models';
import { getAvailableStatuses } from '../../logic';
import { TaskStatus } from '../../models/enums';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';

interface FormData {
  title: string;
  description: string;
  status: TaskStatus;
}

interface EditTaskFormProps {
  task: Task;
  onCancel: () => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters'),
  status: yup.string().required('Status is required'),
});

const SELECT_LABEL_ID = 'select-status';

export const EditTaskForm = React.memo(
  ({ task, onCancel }: EditTaskFormProps) => {
    const [editedTask, setEditedTask] = useState<Task>(task);
    const isDisabled = task.status === TaskStatus.Deployed;
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        title: editedTask.title,
        description: editedTask.description,
        status: editedTask.status,
      },
    });
    const dispatch = useAppDispatch();

    const handleStatusChange = (event: SelectChangeEvent<TaskStatus>) => {
      const status = event.target.value as TaskStatus;
      setEditedTask((prevTask) => ({
        ...prevTask,
        status,
      }));
    };

    const onSubmit = (data: FormData) => {
      const updatedTask = {
        ...editedTask,
        title: data.title,
        description: data.description,
        status: data.status,
      };
      dispatch(updateTask(updatedTask));
    };
    return (
      <Container maxWidth="md" style={{ marginTop: '32px' }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          gap={1}
          onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" component="h5">
            Edit Task
          </Typography>
          <TextField
            label="Title"
            variant="filled"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={isDisabled}
          />
          <TextField
            label="Description"
            multiline
            variant="filled"
            rows={20}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isDisabled}
          />
          <FormControl variant="filled" disabled={isDisabled}>
            <InputLabel id={SELECT_LABEL_ID}>Status</InputLabel>
            <Select
              label="Status"
              {...register('status')}
              labelId={SELECT_LABEL_ID}
              error={!!errors.status}
              defaultValue={editedTask.status}
              onChange={handleStatusChange}>
              {getAvailableStatuses(editedTask.status).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<BorderColorIcon />}
              fullWidth
              disabled={!isDirty || !isValid}>
              Edit
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={onCancel}
              fullWidth>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    );
  },
);
