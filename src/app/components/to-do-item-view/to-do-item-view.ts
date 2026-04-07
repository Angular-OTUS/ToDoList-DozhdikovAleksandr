import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit, output,
  signal,
} from '@angular/core';
import {Task, TASK_STATUS_IN_PROGRESS} from '../../data/task';
import {ActivatedRoute} from '@angular/router';
import {ApiTasksService} from '../../services/api/api-tasks';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView implements OnInit {

  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  readonly selectedTask = output<number>();

  task = signal<Task>(this.emptyTask());

  private apiTasksService = inject(ApiTasksService);

  ngOnInit() {
    this.route.url.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.getTask(id);
      this.selectedTask.emit(id);
    });
  }

  getTask(id: number) {
    this.apiTasksService.getTask(id).subscribe(
      response => {
        this.task.set(response);
      },
    );
  }

  private emptyTask(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      status: TASK_STATUS_IN_PROGRESS,
    }
  }
}
