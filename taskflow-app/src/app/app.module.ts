import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskListComponent } from './activity/task-list/task-list.component';
import { TaskCreateComponent } from './activity/task-create/task-create.component';
import { TaskDetailComponent } from './activity/task-detail/task-detail.component';
import { TaskEditComponent } from './activity/task-edit/task-edit.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/user-create/create-user.component';
import { EditUserComponent } from './user/user-edit/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskDetailComponent,
    TaskEditComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent,
    UserDetailComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
