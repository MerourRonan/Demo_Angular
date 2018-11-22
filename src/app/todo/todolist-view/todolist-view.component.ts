import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

// Services
import { TodoService } from '../../services/todo.service';

//Class
import { TodoModel } from '../../models/todo-model';
import { DialogTodoComponent } from '../../dialog/dialog-todo/dialog-todo.component';

@Component({
  selector: 'app-todolist-view',
  templateUrl: './todolist-view.component.html',
  styleUrls: ['./todolist-view.component.css']
})
export class TodolistViewComponent implements OnInit {

  todoList: TodoModel[];

  constructor(private todoService: TodoService, private dialog: MatDialog) {
    this.todoService.todoListSubject.subscribe(
      (todoList: TodoModel[]) => { this.todoList = todoList; }
    );
  }

  ngOnInit() {
    this.todoList = this.todoService.todoList;
  }

  openDialogCreateTodo() {
    console.log("open dialog");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isUpdate: false,
      todoModel:new TodoModel("")
    };

    this.dialog.open(DialogTodoComponent, dialogConfig);
  }

}
