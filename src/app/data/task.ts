export const TASK_STATUS_BACKLOG = 'backlog';

export const TASK_STATUS_IN_PROGRESS = 'in-progress';
export const TASK_STATUS_COMPLETED = 'completed';

export interface Filter {
  id: TASK_STATUS;
  title: string;
  selected: boolean;
}

export const TASK_STATUS_LIST: Filter[] = [
  {
    id: TASK_STATUS_BACKLOG,
    title: 'Backlog',
    selected: false,
  },

  {
    id: TASK_STATUS_IN_PROGRESS,
    title: 'In progress',
    selected: false,
  },
  {
    id: TASK_STATUS_COMPLETED,
    title: 'Done',
    selected: false,
  },
];

export type TASK_STATUS =
  | typeof TASK_STATUS_BACKLOG
  | typeof TASK_STATUS_IN_PROGRESS
  | typeof TASK_STATUS_COMPLETED;

/**
 * Пустой или не сохраненный, без id
 */
export interface TaskBase {
  title: string;
  description?: string;
  status: TASK_STATUS;
}

export interface Task extends TaskBase{
  id: string;
}
