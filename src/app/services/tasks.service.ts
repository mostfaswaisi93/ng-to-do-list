import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000/api/tasks/';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{ tasks: Task[]; taskCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getTasks(tasksPerPage: number, currentPage: number): any {
    const queryParams = `?pagesize=${tasksPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; tasks: any; maxTasks: number }>
      (BACKEND_URL + queryParams)
      .pipe(
        map(taskData => {
          return {
            tasks: taskData.tasks.map(task => {
              return {
                name: task.name,
                date: task.date,
                status: task.status,
                description: task.description,
                id: task._id,
                creator: task.creator
              };
            }),
            maxTasks: taskData.maxTasks
          };
        })
      )
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks.tasks;
        this.tasksUpdated.next({
          tasks: [...this.tasks],
          taskCount: transformedTasks.maxTasks
        });
      });
  }

  getTaskUpdateListener(): any {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string): any {
    return this.http.get<{ _id: string; name: string; date: Date; status: string; description: string; creator: string; }>(
      BACKEND_URL + id
    );
  }

  addTask(name: string, date: Date, status: string, description: string, creator: string): any {
    const task: Task = { id: null, name, date, status, description, creator };
    this.http
      .post<{ message: string; taskId: string }>(
        BACKEND_URL,
        task
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateTask(id: string, name: string, date: Date, status: string, description: string, creator: string): any {
    const task: Task = { id, name, date, status, description, creator };
    this.http
      .put(BACKEND_URL + id, task)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteTask(taskId: string): any {
    return this.http
      .delete(BACKEND_URL + taskId);
  }

}
