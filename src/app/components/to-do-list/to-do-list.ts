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
  private destroyRef = inject(DestroyRef);

  private _tasks = signal<Task[]>([]);
  tasks = this._tasks.asReadonly();

  private _isLoading = signal<boolean>(true);
  isLoading = this._isLoading.asReadonly();

  private _selectedId = signal<number|null>(null);
  selectedId = this._selectedId.asReadonly();

  private _editModeTaskId = signal<number|null>(null);
  editModeTaskId = this._editModeTaskId.asReadonly();

  selectedDescription = computed<string>(()=> {
    const id = this._selectedId();
    if (id) {
      return this._tasks().find(element=> element.id === id)?.description ?? '';
    }
    return '';
  })

  ngOnInit() {
    timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this._isLoading.set(false);
    });
    this._tasks.set(this.tasksService.getTasks());
  }

  deleteItem(task: Task): void {
    this._tasks.update(()=> this.tasksService.deleteTask(task));
    this._selectedId.set(null);
    this.toastService.showToast('Удалена задача "' + task.title + '"', TOAST_TYPE_CRITICAL)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  addItem(task: TaskBase): void {
    this._tasks.update(() => this.tasksService.addTask(task));
    this.toastService.showToast('Добавлена задача "' + task.title + '"', TOAST_TYPE_INFO)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateItem(task: Task): void {
    this._tasks.update(()=> this.tasksService.updateTask(task));
    this._editModeTaskId.set(null);
    this.toastService.showToast('Изменена задача "' + task.title + '"', TOAST_TYPE_NOTICE)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  setSelectedId(id: number): void {
    this._selectedId.set(id);
    this._editModeTaskId.set(null);
  }

  setEditModeTaskId(id: number|null): void {
    this._editModeTaskId.set(id);
  }
}
