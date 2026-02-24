import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';
import {Task, TaskBase} from '../../data/task';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TasksService} from '../../services/tasks/tasks';
import {ToastService} from '../../services/toasts/toast';
import {TOAST_TYPE_CRITICAL, TOAST_TYPE_INFO, TOAST_TYPE_NOTICE} from '../../data/toast';

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

  readonly tasksService = inject(TasksService);
  readonly toastService = inject(ToastService);

  public tasks = signal<Task[]>([]);

  isLoading = signal<boolean>(true);
  selectedId = signal<number|null>(null);
  editModeTaskId = signal<number|null>(null);
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
    this.tasks.set(this.tasksService.getTasks());
  }

  deleteItem(task: Task): void {
    this.tasks.update(()=> this.tasksService.deleteItem(task));
    this.selectedId.set(null);
    this.toastService.showToast('Удалена задача "' + task.title + '"', TOAST_TYPE_CRITICAL);
  }

  addItem(task: TaskBase): void {
    this.tasks.update(() => this.tasksService.addItem(task));
    this.toastService.showToast('Добавлена задача "' + task.title + '"', TOAST_TYPE_INFO);
  }

  updateItem(task: Task): void {
    this.tasks.update(()=> this.tasksService.updateItem(task));
    this.editModeTaskId.set(null);
    this.toastService.showToast('Изменена задача "' + task.title + '"', TOAST_TYPE_NOTICE);
  }

  setSelectedId(id: number): void {
    this.selectedId.set(id);
    this.editModeTaskId.set(null);
  }

  setEditModeTaskId(id: number|null): void {
    this.editModeTaskId.set(id);
  }
}
