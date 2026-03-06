import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Task, TaskBase} from '../../data/task';

@Injectable({
  providedIn: 'root',
})
export class ApiTasksService {

  private http = inject(HttpClient)

  readonly apiUrl= 'http://localhost:3000';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/tasks');
  }

  addTask(task: TaskBase): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + '/tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(this.apiUrl + '/tasks/' + task.id, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.apiUrl + '/tasks/' + task.id);
  }
}
