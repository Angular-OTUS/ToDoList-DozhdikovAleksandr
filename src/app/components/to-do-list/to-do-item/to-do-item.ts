import {ChangeDetectionStrategy, Component, effect, ElementRef, input, output, viewChild} from '@angular/core';
import {Task} from '../../../data/task';
import {Button} from '../../button/button';
import {TooltipDirective} from '../../../directives/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.scss',
  imports: [
    Button,
    TooltipDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItem {

  readonly selected = input.required<boolean>();
  readonly editMode = input.required<boolean|null>();
  readonly task = input.required<Task>();
  readonly deleteItem = output<Task>();
  readonly updateItem = output<Task>();
  readonly selectedTask = output<number>();
  readonly editModeTask = output<number|null>();

  editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  focusEffect = effect(() => {
    this.editInput()?.nativeElement.focus();
  });

  setSelectedTask(task: Task) {
    if (!this.editMode()) {
      this.selectedTask.emit(task.id);
    }
  }

  onEdit(id: number) {
    this.editModeTask.emit(id);
  }
}
