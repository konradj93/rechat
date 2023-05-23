import { getAvailableStatuses } from '.';
import { TaskStatus } from '../models/enums';

describe('getAvailableStatuses', () => {
  it('should return available statuses for ToDo', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.ToDo);
    expect(availableStatuses).toEqual([TaskStatus.ToDo, TaskStatus.InProgress]);
  });

  it('should return available statuses for InProgress', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.InProgress);
    expect(availableStatuses).toEqual([
      TaskStatus.InProgress,
      TaskStatus.Blocked,
      TaskStatus.InQA,
    ]);
  });

  it('should return available statuses for Blocked', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.Blocked);
    expect(availableStatuses).toEqual([TaskStatus.Blocked, TaskStatus.ToDo]);
  });

  it('should return available statuses for InQA', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.InQA);
    expect(availableStatuses).toEqual([
      TaskStatus.InQA,
      TaskStatus.ToDo,
      TaskStatus.Done,
    ]);
  });

  it('should return available statuses for Done', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.Done);
    expect(availableStatuses).toEqual([TaskStatus.Done, TaskStatus.Deployed]);
  });

  it('should return available statuses for Deployed', () => {
    const availableStatuses = getAvailableStatuses(TaskStatus.Deployed);
    expect(availableStatuses).toEqual([TaskStatus.Deployed]);
  });
});
