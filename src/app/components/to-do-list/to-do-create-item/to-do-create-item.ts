import {ChangeDetectionStrategy, Component, output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {TASK_STATUS_IN_PROGRESS, TaskBase} from '../../../data/task';
import {TooltipDirective} from '../../../directives/tooltip';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    TooltipDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {

  task = signal<TaskBase>(this.emptyTask());

  readonly addItem = output<TaskBase>();

  form = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl(''),
    }
  );

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
      status: TASK_STATUS_IN_PROGRESS,
    }
  }

  onSubmit() {
    this.task.set({title: this.form.value.title?? '', description: this.form.value.description ?? '', status: TASK_STATUS_IN_PROGRESS});
    this.add(this.task());
  }
}
