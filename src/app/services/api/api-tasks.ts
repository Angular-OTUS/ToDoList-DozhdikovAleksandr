import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Task, TaskBase} from '../../data/task';
import {environment} from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiTasksService {

  private http = inject(HttpClient)

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl);
  }

  addTask(task: TaskBase): Observable<Task> {
    return this.http.post<Task>(environment.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(environment.apiUrl + '/' + task.id, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(environment.apiUrl + '/' + task.id);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(environment.apiUrl + '/' + id);
  }
}
