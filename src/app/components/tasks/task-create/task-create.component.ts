import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/models/status.model';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit, OnDestroy {
  task: Task;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private taskId: string;
  private authStatusSub: Subscription;

  stClass: Status[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' }
  ];

  constructor(
    public tasksService: TasksService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      date: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.isLoading = true;
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.isLoading = false;
          this.task = {
            id: taskData._id,
            name: taskData.name,
            date: taskData.date,
            status: taskData.status,
            description: taskData.description,
            creator: taskData.creator
          };
          this.form.setValue({
            name: this.task.name,
            date: this.task.date,
            status: this.task.status,
            description: this.task.description
          });
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  onSaveTask(): any {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.tasksService.addTask(
        this.form.value.name,
        this.form.value.date,
        this.form.value.status,
        this.form.value.description,
        this.form.value.creator
      );
    } else {
      this.tasksService.updateTask(
        this.taskId,
        this.form.value.name,
        this.form.value.date,
        this.form.value.status,
        this.form.value.description,
        this.form.value.creator
      );
    }
    this.form.reset();
  }

  ngOnDestroy(): any {
    this.authStatusSub.unsubscribe();
  }

}
