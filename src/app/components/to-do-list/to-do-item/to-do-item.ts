import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Task} from '../../../data/task';
import {Button} from '../../button/button';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.scss',
  imports: [
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItem {

  readonly task = input.required<Task>();
  readonly deleteItem = output<Task>();
}
