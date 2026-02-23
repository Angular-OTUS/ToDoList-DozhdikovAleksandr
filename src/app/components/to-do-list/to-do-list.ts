import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';
import {Task, TaskBase} from '../../data/task';
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
        title: "Нужно что-то сделать (1)...",
        description: "Какая-то полезная информация (1)",
      },
      {
        id: 2,
        title: "Нужно что-то сделать (2)...",
        description: "Какая-то полезная информация (2)",
      },
    ],
  );

  isLoading = signal<boolean>(true);
  selectedId = signal<number|null>(null);
  selectedDescription = computed<string>(()=> {
    const id = this.selectedId();
    if (id) {
      return this.tasks().find(element=> element.id === id)?.description ?? '';
    }
    return '';
  })

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isLoading.set(false);
    });
  }

  deleteItem(task: Task): void {
    this.tasks.update((tasks) => tasks.filter(element => element.id !== task.id));
    this.selectedId.set(null);
  }

  addItem(task: TaskBase): void {
    if (task.title.trim().length) {
      const maxId: number = Math.max(0,...this.tasks().map(obj => obj.id));
      this.tasks.update((tasks) => [...tasks, {id: maxId + 1, title: task.title.trim(), description: task.description}]);
    }
  }
  setSelectedId(id: number): void {
    this.selectedId.set(id);
  }

}
