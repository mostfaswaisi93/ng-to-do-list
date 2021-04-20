import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { ShowTaskComponent } from './components/tasks/show-task/show-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    CreateTaskComponent,
    ShowTaskComponent,
    EditTaskComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
