import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {Task, TaskBase} from '../../data/task';
import {timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TasksService} from '../../services/tasks/tasks';
import {ToastService} from '../../services/toasts/toast';
import {TOAST_TYPE_INFO, TOAST_TYPE_NOTICE} from '../../data/toast';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {ToDoFilters} from '../to-do-filters/to-do-filters';
import {ActivatedRoute, Router} from '@angular/router';
import {ToDoCreateItem} from './to-do-create-item/to-do-create-item';
import {ApiTasksService} from '../../services/api/api-tasks';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoItem,
    LoadingSpinner,
    ToDoFilters,
    ToDoCreateItem,
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

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  private destroyRef = inject(DestroyRef);

  private apiTasksService = inject(ApiTasksService);

  ngOnInit() {
    timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isLoading.set(false);
    });

    /**
     * TODO: если есть параметр будет два события
     * первое с пустым набором параметров {} в route.snapshot.queryParams
     * второе с реальным
     */

    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.setFiltersFromUrl());
  }

  getTasks(filters?: string[]) {
    this.apiTasksService.getTasks().subscribe(
      response => {
        timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.isLoading.set(false);
        });
        this.tasks.set(response.filter(
          item => !filters || !filters.length || filters.includes(item.status)
        ));
      }
    );
  }

  setFiltersFromUrl() {
    const params = this.route.snapshot.queryParams;
    const queryFilters: string[] = params["filters"];
    this.getTasks(queryFilters);
  }

  deleteItem(task: Task): void {

    this.apiTasksService.deleteTask(task).subscribe(
      response => {
        this.tasks.set(this.tasks().filter(element => element.id !== task.id));
        this.toastService.showToast('Удалена задача "' + task.title + '"', TOAST_TYPE_NOTICE);
      }
    );
  }

  addItem(task: TaskBase): void {
    this.apiTasksService.addTask(task).subscribe(
      response => {
        this.tasks.set([...this.tasks(), response]);
        this.toastService.showToast('Добавлена задача "' + task.title + '"', TOAST_TYPE_INFO);
      }
    );
  }

  updateItem(task: Task): void {
    this.apiTasksService.updateTask(task).subscribe(
      response => {
        this.tasks().map(
          item => {
            if (item.id === response.id) {
              return response;
            }
            return item;
          }
        );
        this.toastService.showToast('Изменена задача "' + task.title + '"', TOAST_TYPE_NOTICE);
      }
    );
  }

  setSelectedId(id: number): void {
    this.selectedId.set(id);
    this.editModeTaskId.set(null);
  }

  setEditModeTaskId(id: number|null): void {
    this.editModeTaskId.set(id);
  }
}
