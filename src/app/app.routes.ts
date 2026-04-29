import { Routes } from '@angular/router';

export enum ROUTE_PATH {
  tasks = 'backlog',
  board = 'board',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH.tasks,
    pathMatch: 'full'
  },
  {
    path: ROUTE_PATH.board,
    loadComponent: () =>
      import('./components/board/board')
        .then(m => m.Board),
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
