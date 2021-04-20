import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks;
  constructor(public tasksService: TasksService, public router: Router) {
    tasksService.getTasks().subscribe(data => (this.tasks = data));
  }

  deleteTask(id): any {
    if (confirm('Are you sure to delete it?')) {
      this.tasksService.deleteTask(id).subscribe(data => {
        if (data) {
          this.tasksService.getTasks().subscribe(e => (this.tasks = e));
        }
      });
    }
  }

  editTask(id): any {
    this.router.navigate(['tasks/edit', id]);
  }

  showTask(id): any {
    this.router.navigate(['tasks/show', id]);
  }

  ngOnInit(): void {
  }

}
