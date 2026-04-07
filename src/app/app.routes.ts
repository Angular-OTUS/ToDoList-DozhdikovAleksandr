import { Routes } from '@angular/router';
import {ToDoList} from './components/to-do-list/to-do-list';
import {ToDoItemView} from './components/to-do-item-view/to-do-item-view';

export enum ROUTE_PATH {
  tasks = 'tasks',
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/to-do-list/to-do-list')
        .then(m => m.ToDoList),
  },
  {
    path: ROUTE_PATH.tasks,
    loadComponent: () =>
      import('./components/to-do-list/to-do-list')
        .then(m => m.ToDoList),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./components/to-do-item-view/to-do-item-view')
            .then(m => m.ToDoItemView),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/to-do-list/to-do-list')
        .then(m => m.ToDoList),
  },
];
