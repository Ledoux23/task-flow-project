import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './activity/task-list/task-list.component';
import { TaskCreateComponent } from './activity/task-create/task-create.component';
import { TaskDetailComponent } from './activity/task-detail/task-detail.component';
import { TaskEditComponent } from './activity/task-edit/task-edit.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/user-create/create-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { EditUserComponent } from './user/user-edit/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirige vers la liste des tâches par défaut
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-task', component: TaskCreateComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'tasks/:id/edit', component: TaskEditComponent },

  // users
  { path: 'users', component: UserListComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'users/:id/edit', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
