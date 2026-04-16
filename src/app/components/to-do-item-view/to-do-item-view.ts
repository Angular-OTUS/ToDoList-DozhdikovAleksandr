import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {Task, TASK_STATUS_IN_PROGRESS} from '../../data/task';
import {ActivatedRoute} from '@angular/router';
import {ApiTasksService} from '../../services/api/api-tasks';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {

  private route = inject(ActivatedRoute);
  private apiTasksService = inject(ApiTasksService);

  task = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.apiTasksService.getTask(id)),
    ),
    { initialValue: this.emptyTask() },
  );

  private emptyTask(): Task {
    return {
      id: "0",
      title: '',
      description: '',
      status: TASK_STATUS_IN_PROGRESS,
    }
  }
}
