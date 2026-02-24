import {Injectable} from '@angular/core';
import {Task, TaskBase} from '../../data/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private tasks: Task[] = [
    {
      id: 1,
      title: "Нужно что-то сделать (1)...",
      description: "Какая-то полезная информация (1)",
    },
    {
      id: 2,
      title: "Нужно что-то сделать (2)...",
      description: "Какая-то полезная информация (2)",
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  deleteItem(task: Task): Task[] {
    this.tasks = this.tasks.filter(element => element.id !== task.id);
    return this.tasks;
  }

  addItem(task: TaskBase): Task[] {
    if (task.title.trim().length) {
      const maxId: number = Math.max(0,...this.tasks.map(obj => obj.id));
      this.tasks = [...this.tasks, {id: maxId + 1, title: task.title.trim(), description: task.description}];
    }
    return this.tasks;
  }

  updateItem(task: Task): Task[] {
    this.tasks = this.tasks.map(item=> {
      if (item.id === task.id) {
        return task;
      }
      return item;
    });
    return this.tasks;
  }
}
