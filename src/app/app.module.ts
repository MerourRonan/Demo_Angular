import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';

// Service
import {AuthService} from './services/auth.service';
import {TodoService} from './services/todo.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ApiService} from './services/api.service';

// Components
import { AppComponent } from './app.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { FourOhFourComponent } from './routing/four-oh-four/four-oh-four.component';
import { MessageViewComponent } from './chat/message-view/message-view.component';
import { TodoViewComponent } from './todo/todo-view/todo-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewUserComponent } from './authentication/new-user/new-user.component';
import { TodolistViewComponent } from './todo/todolist-view/todolist-view.component';
import { TaskViewComponent } from './todo/task-view/task-view.component';
import { TodolistElementComponent } from './todo/todolist-element/todolist-element.component';
import { TaskElementComponent } from './todo/task-element/task-element.component';
import { DialogTodoComponent } from './dialog/dialog-todo/dialog-todo.component';
import { DialogTaskComponent } from './dialog/dialog-task/dialog-task.component';

// Routing
import {routing} from './routing/app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FourOhFourComponent,
    MessageViewComponent,
    TodoViewComponent,
    NavbarComponent,
    NewUserComponent,
    TodolistViewComponent,
    TaskViewComponent,
    TodolistElementComponent,
    TaskElementComponent,
    DialogTodoComponent,
    DialogTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [AuthService,AuthGuardService,TodoService,ApiService],
  bootstrap: [AppComponent],
  entryComponents:[DialogTodoComponent,DialogTaskComponent]
})
export class AppModule { }
