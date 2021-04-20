import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  task: Task;
  constructor(
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute
  ) {
    this.tasksService
      .getTask(this.activatedRoute.snapshot.params.id)
      .subscribe(data => (this.task = data));
  }

  ngOnInit(): void {
  }

}
