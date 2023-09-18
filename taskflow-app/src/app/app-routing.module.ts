import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './activity/task-list/task-list.component';
import { TaskCreateComponent } from './activity/task-create/task-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirige vers la liste des tâches par défaut
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-task', component: TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
