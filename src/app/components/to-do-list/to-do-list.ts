import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';
import {Task} from '../../data/task';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {timer} from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoAdd,
    ToDoItem,
    MatProgressSpinner,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToDoList implements OnInit {

  public tasks = signal<Task[]>(
    [
      {
        id: 1,
        text: "Нужно что-то сделать (1)...",
      },
      {
        id: 2,
        text: "Нужно что-то сделать (2)...",
      },
    ],
  );

  public isLoading = signal<boolean>(true);

  ngOnInit() {
    timer(500).subscribe(() => {
      this.isLoading.set(false);
    });
  }

  deleteItem(task: Task): void {
    this.tasks.set(this.tasks().filter(element => element.id !== task.id));
  }

  addItem(text: string): void {
    const maxId: number = Math.max(0,...this.tasks().map(obj => obj.id));
    this.tasks.update((tasks) => [...tasks, {id: maxId + 1, text}]);
  }
}
