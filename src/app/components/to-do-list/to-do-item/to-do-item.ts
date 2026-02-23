import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Task} from '../../../data/task';
import {Button} from '../../button/button';
import {TooltipDirective} from '../../../directives/tooltip';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.scss',
  imports: [
    Button,
    TooltipDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItem {

  readonly selected = input.required<boolean>();
  readonly task = input.required<Task>();
  readonly deleteItem = output<Task>();
  readonly selectedTask = output<number>();
}
