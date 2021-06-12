import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:taskId', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('src/app/components/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
