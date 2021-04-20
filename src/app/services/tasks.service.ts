import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(public http: HttpClient) { }

  getTasks(): any {
    return this.http.get('http://localhost:3000/tasks');
  }

  getTask(id): any {
    return this.http.get(`http://localhost:3000/tasks/${id}`);
  }

  addTask(task): any {
    return this.http.post('http://localhost:3000/tasks', task);
  }

  editTask(task: Task): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/tasks/${task.id}`, task);
  }

  deleteTask(id): any {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }

}
