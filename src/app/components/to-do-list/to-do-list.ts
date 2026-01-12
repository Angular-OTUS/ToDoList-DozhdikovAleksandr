import { Component } from '@angular/core';
import {ToDoItem} from './to-do-item/to-do-item';
import {ToDoAdd} from './to-do-add/to-do-add';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoItem,
    ToDoAdd
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {

}
