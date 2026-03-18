import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {Task, TaskBase} from '../../data/task';
import {map, switchMap, tap, timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TasksService} from '../../services/tasks/tasks';
import {ToastService} from '../../services/toasts/toast';
import {TOAST_TYPE_INFO, TOAST_TYPE_NOTICE} from '../../data/toast';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {ToDoFilters} from '../to-do-filters/to-do-filters';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ToDoCreateItem} from './to-do-create-item/to-do-create-item';
import {ApiTasksService} from '../../services/api/api-tasks';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoItem,
    LoadingSpinner,
    ToDoFilters,
    ToDoCreateItem,
    RouterOutlet,
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

  private route = inject(ActivatedRoute);
  private apiTasksService = inject(ApiTasksService);

  ngOnInit() {
    timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this._isLoading.set(false);
    });

    /**
     * TODO: если есть параметр будет два события
     * первое с пустым набором параметров {} в route.snapshot.queryParams
     * второе с реальным
     */

    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => this.setFiltersFromUrl());
  }

  getTasks(filters?: string[]) {
    this.apiTasksService.getTasks().pipe(
      switchMap(response =>
        timer(500).pipe(
          tap(() => this._isLoading.set(false)),
          map(() => response),
        ),
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(response => {
      this._tasks.set(
        response.filter(
          item => !filters || !filters.length || filters.includes(item.status),
        ),
      );
    });
  }


  setFiltersFromUrl() {
    const params = this.route.snapshot.queryParams;
    const queryFilters: string[] = params["filters"];
    this.getTasks(queryFilters);
  }

  deleteItem(task: Task): void {

    this.apiTasksService.deleteTask(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      () => {
        this._tasks.set(this.tasks().filter(element => element.id !== task.id));
        this.toastService.showToast('Удалена задача "' + task.title + '"', TOAST_TYPE_NOTICE);
      },
    );
  }

  addItem(task: TaskBase): void {
    this.apiTasksService.addTask(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      response => {
        this._tasks.set([...this.tasks(), response]);
        this.toastService.showToast('Добавлена задача "' + task.title + '"', TOAST_TYPE_INFO);
      },
    );
  }

  updateItem(task: Task): void {
    this.apiTasksService.updateTask(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      response => {
        this.tasks().map(
          item => {
            if (item.id === response.id) {
              return response;
            }
            return item;
          },
        );
        this._editModeTaskId.set(null);
        this.toastService.showToast('Изменена задача "' + task.title + '"', TOAST_TYPE_NOTICE);
      },
    );
  }

  setSelectedId(id: number): void {
    this._selectedId.set(id);
    this._editModeTaskId.set(null);
  }

  setEditModeTaskId(id: number|null): void {
    this._editModeTaskId.set(id);
  }
}
