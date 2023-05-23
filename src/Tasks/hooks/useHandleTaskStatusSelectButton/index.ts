import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Task } from '../../models';
import { TaskStatus } from '../../models/enums';
import { useTaskContext } from '../../context';

export const useHandleTaskStatusSelectButton = (task: Task) => {
  const [userChangingStatus, setUserIsChangingStatus] = useState(false);
  const { status } = task;
  const { updateTask } = useTaskContext();

  const onStatusChange = (e: SelectChangeEvent<TaskStatus>) => {
    const value = e.target.value as TaskStatus;
    updateTask({ ...task, status: value });
    setUserIsChangingStatus(false);
  };

  const handleClickOutsideSelect = (
    event:
      | MouseEvent
      | TouchEvent
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // body because of how the select works
    const isSelectClick = event.target instanceof HTMLBodyElement;
    if (isSelectClick) return;
    setUserIsChangingStatus(false);
  };

  return {
    status,
    userChangingStatus,
    onStatusChange,
    handleClickOutsideSelect,
    setUserIsChangingStatus,
  };
};
