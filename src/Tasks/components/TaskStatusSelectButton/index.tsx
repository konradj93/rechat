import {
  Button,
  ClickAwayListener,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { FC, useId } from 'react';
import { TaskStatus } from '../../models/enums';
import { TaskBase } from '../../models';
import { getAvailableStatuses } from '../../logic';
import { useHandleTaskStatusSelectButton } from '../../hooks/useHandleTaskStatusSelectButton';

interface TaskStatusSelectButtonProps {
  task: TaskBase;
}

export const TaskStatusSelectButton: FC<TaskStatusSelectButtonProps> = ({
  task,
}) => {
  const {
    userChangingStatus,
    status,
    setUserIsChangingStatus,
    handleClickOutsideSelect,
    onStatusChange,
  } = useHandleTaskStatusSelectButton(task);
  const accessibilityId = useId();

  if (!userChangingStatus) {
    return (
      <Button
        variant="contained"
        disabled={status === TaskStatus.Deployed}
        onClick={() => setUserIsChangingStatus(true)}>
        {status}
      </Button>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleClickOutsideSelect}>
      <FormControl>
        <InputLabel id={`task-status-seclect-${accessibilityId}`}>
          Status
        </InputLabel>
        <Select
          size="small"
          value={status}
          label="Status"
          labelId={`task-status-seclect-${accessibilityId}`}
          onChange={onStatusChange}
          onClick={handleClickOutsideSelect}>
          {getAvailableStatuses(status).map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ClickAwayListener>
  );
};
