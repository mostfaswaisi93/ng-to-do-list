import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { ShowTaskComponent } from './components/tasks/show-task/show-task.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/create', component: CreateTaskComponent },
  { path: 'tasks/edit/:id', component: EditTaskComponent },
  { path: 'tasks/show/:id', component: ShowTaskComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
