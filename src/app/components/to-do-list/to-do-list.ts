import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';
import {Task} from '../../data/task';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isLoading.set(false);
    });
  }

  deleteItem(task: Task): void {
    this.tasks.update((tasks) => tasks.filter(element => element.id !== task.id));
  }

  addItem(text: string): void {
    if (text.trim().length) {
      const maxId: number = Math.max(0,...this.tasks().map(obj => obj.id));
      this.tasks.update((tasks) => [...tasks, {id: maxId + 1, text}]);
    }
  }
}
