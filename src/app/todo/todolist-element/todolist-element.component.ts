import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

//Class
import { TodoModel } from '../../models/todo-model';
import { DialogTodoComponent } from '../../dialog/dialog-todo/dialog-todo.component';

// Services
import { TodoService } from '../../services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todolist-element',
  templateUrl: './todolist-element.component.html',
  styleUrls: ['./todolist-element.component.css']
})
export class TodolistElementComponent implements OnInit {

  @Input() todoList: TodoModel;
  @Input() index: number;
  isSelected: boolean;
  canBeModify: boolean = false;

  constructor(private todoService: TodoService, private dialog: MatDialog) {
    this.todoService.todoSelectedSubject.subscribe(
      (todoListSelected: TodoModel) => {
        this.checkSelection(this.todoService.todoSelectedIndex);
      });
  }

  ngOnInit() {
  }

  openDialogModifyTodo() {
    console.log("open dialog for update todo");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isUpdate: true,
      todoIndex: this.index,
      todoModel: this.todoList
    };

    this.dialog.open(DialogTodoComponent, dialogConfig);
  }

  deleteTodo() {
    //supprimer la todo
    this.todoService.deleteTodo(this.index);
  }

  selectTodo() {
    // selectionne la todolist et affiche ces éléments
    console.log("select todo :" + this.index);
    this.isSelected = true;
    this.todoService.selectTodo(this.index)

  }

  checkSelection(index: number) {
    this.isSelected = (this.index == index)
  }

}
