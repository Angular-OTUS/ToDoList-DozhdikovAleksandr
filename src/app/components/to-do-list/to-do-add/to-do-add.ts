import {ChangeDetectionStrategy, Component, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Button} from '../../button/button';
import {TaskBase} from '../../../data/task';
import {TooltipDirective} from '../../../directives/tooltip';

@Component({
  selector: 'app-to-do-add',
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    Button,
    MatLabel,
    TooltipDirective,
  ],
  templateUrl: './to-do-add.html',
  styleUrl: './to-do-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoAdd {

  task = signal<TaskBase>(this.emptyTask());

  readonly addItem = output<TaskBase>();

  public add(task: TaskBase): void {
    if (!task.title.length) {
      return;
    }
    this.addItem.emit(task);
    this.task.set(this.emptyTask());
  }

  private emptyTask(): TaskBase {
    return {
      title: '',
      description: '',
    }
  }
}
