import { Routes } from '@angular/router';
import {ToDoList} from './components/to-do-list/to-do-list';
import {ToDoItemView} from './components/to-do-item-view/to-do-item-view';

export enum ROUTE_PATH {
  tasks = 'tasks',
}

export const routes: Routes = [
  {path: '', component: ToDoList},
  {
    path: ROUTE_PATH.tasks, component: ToDoList,
    children: [
      {
        path: ':id',
        component: ToDoItemView,
      },
    ],
  },
  {path: '**', component: ToDoList},
];
