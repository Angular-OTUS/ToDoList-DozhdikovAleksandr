import {Injectable} from '@angular/core';
import {TASK_STATUS_COMPLETED, TASK_STATUS_IN_PROGRESS, Task, TaskBase, Filter} from '../../data/task';

/**
 * TODO: Как буд-то после ДЗ №6 больше не нужен.
 * Если так, удалить после ревью.
 */

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      title: "Нужно что-то сделать (1)...",
      description: "Какая-то полезная информация (1)",
      status: TASK_STATUS_IN_PROGRESS,
    },
    {
      id: 2,
      title: "Нужно что-то сделать (2)...",
      description: "Какая-то полезная информация (2)",
      status: TASK_STATUS_COMPLETED,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(task: Task): Task[] {
    this.tasks = this.tasks.filter(element => element.id !== task.id);
    return this.tasks;
  }

  addTask(task: TaskBase): Task[] {
    if (task.title.trim().length) {
      const maxId: number = Math.max(0,...this.tasks.map(obj => obj.id));
      this.tasks = [...this.tasks, {id: maxId + 1, title: task.title.trim(), description: task.description, status: TASK_STATUS_IN_PROGRESS}];
    }
    return this.tasks;
  }

  updateTask(task: Task): Task[] {
    this.tasks = this.tasks.map(item=> {
      if (item.id === task.id) {
        return task;
      }
      return item;
    });
    return this.tasks;
  }
}
