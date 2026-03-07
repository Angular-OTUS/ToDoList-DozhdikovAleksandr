import { Component } from '@angular/core';
import {ToDoList} from './components/to-do-list/to-do-list';
import {Toast} from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [ToDoList, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
