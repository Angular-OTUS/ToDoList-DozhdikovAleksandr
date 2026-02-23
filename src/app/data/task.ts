/**
 * Пустой или не сохраненный, без id
 */
export interface TaskBase {
  title: string;
  description?: string;
}

export interface Task extends TaskBase{
  id: number;
}
