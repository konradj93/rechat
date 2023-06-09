import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import * as yup from 'yup';
import { useTaskContext } from '../../context';

interface FormData {
  title: string;
  description: string;
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
});

export const AddTaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { addTask } = useTaskContext();

  const onSubmit = (data: FormData) => {
    addTask(data);
    reset();
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
          Add a new Task
        </Typography>
        <TextField
          label="Title"
          variant="filled"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description"
          multiline
          variant="filled"
          rows={5}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          disabled={!isValid}>
          Add
        </Button>
      </Box>
    </Container>
  );
};
