import {
  ChangeDetectionStrategy,
  Component,
  effect,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import {Task, TASK_STATUS_COMPLETED, TASK_STATUS_IN_PROGRESS} from '../../../data/task';
import {Button} from '../../button/button';
import {TooltipDirective} from '../../../directives/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ROUTE_PATH} from '../../../app.routes';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.scss',
  imports: [
    Button,
    TooltipDirective,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItem {

  readonly selected = input.required<boolean>();
  readonly editMode = input.required<boolean|null>();
  readonly task = input.required<Task>();
  readonly deleteItem = output<Task>();
  readonly updateItem = output<Task>();
  readonly selectedTask = output<string>();
  readonly editModeTask = output<string|null>();
  readonly ROUTE_PATH = ROUTE_PATH;

  editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  focusEffect = effect(() => {
    this.editInput()?.nativeElement.focus();
  });

  status = computed<boolean>(()=> {
    return TASK_STATUS_COMPLETED === this.task().status
  })

  setSelectedTask(task: Task) {
    if (!this.editMode()) {
      this.selectedTask.emit(task.id);
    }
  }

  onEdit(id: string) {
    this.editModeTask.emit(id);
  }

  setStatus(event: Event) {
    event.stopPropagation();
    this.task().status = this.status() ? TASK_STATUS_IN_PROGRESS : TASK_STATUS_COMPLETED;
    this.updateItem.emit(this.task());
  }
}
