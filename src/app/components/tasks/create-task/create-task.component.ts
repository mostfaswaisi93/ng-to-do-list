import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  addTaskForm = this.fb.group({
    name: ['', [Validators.required]],
    date: ['', [Validators.required]],
    status: [1, [Validators.required]],
    description: ['', [Validators.required]]
  });

  statusClass: Status[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' }
  ];
  constructor(public tasksService: TasksService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  save(): any {
    this.tasksService.addTask(this.addTaskForm.value).subscribe(data => {
      if (data) {
        this.router.navigate(['tasks']);
      }
    });
  }

}
