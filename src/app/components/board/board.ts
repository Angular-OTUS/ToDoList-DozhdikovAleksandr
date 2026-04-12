import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  Filter,
  Task,
  TASK_STATUS,
  TASK_STATUS_BACKLOG,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_LIST
} from '../../data/task';
import {ApiTasksService} from '../../services/api/api-tasks';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  private apiTasksService = inject(ApiTasksService);

  filters = signal<Filter[]>(TASK_STATUS_LIST);

  tasksByStatus = signal<Record<TASK_STATUS, Task[] | null>>(
    {
      [TASK_STATUS_BACKLOG]: null,
      [TASK_STATUS_IN_PROGRESS]: null,
      [TASK_STATUS_COMPLETED]: null,
    }
  );

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.apiTasksService.getTasks().subscribe(response => {

      const tasksByStatus:Record<string, Task[]> = {
        [TASK_STATUS_BACKLOG]: [],
        [TASK_STATUS_IN_PROGRESS]: [],
        [TASK_STATUS_COMPLETED]: [],
      };

      response.forEach(
        (item) => {
          tasksByStatus[item.status].push(item);
        },
      )

      this.tasksByStatus.set(tasksByStatus);
    });
  }
}
