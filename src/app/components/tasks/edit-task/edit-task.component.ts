import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task;

  editTaskForm = this.fb.group({
    id: ['', [Validators.required]],
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
  constructor(public tasksService: TasksService, public router: Router, public activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.tasksService
      .getTask(this.activatedRoute.snapshot.params.id)
      .subscribe(data => {
        this.task = data;
        console.log(data);
        this.editTaskForm.controls.id.setValue(this.task.id);
        this.editTaskForm.controls.name.setValue(this.task.name);
        this.editTaskForm.controls.date.setValue(this.task.date);
        this.editTaskForm.controls.status.setValue(this.task.status);
        this.editTaskForm.controls.description.setValue(this.task.description);
      });
  }

  save(): any {
    this.tasksService.editTask(this.editTaskForm.getRawValue()).subscribe(
      () => {
        this.router.navigate(['tasks']);
      }
    );
  }

  ngOnInit(): void {
  }

}
