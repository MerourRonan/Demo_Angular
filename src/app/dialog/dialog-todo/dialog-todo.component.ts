import { Component, OnInit, Input , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

// Services
import { TodoService } from '../../services/todo.service';

//Class
import { TodoModel } from '../../models/todo-model';

@Component({
  selector: 'app-dialog-todo',
  templateUrl: './dialog-todo.component.html',
  styleUrls: ['./dialog-todo.component.css']
})
export class DialogTodoComponent implements OnInit {

  @Input() todoModel: TodoModel;
  @Input() todoIndex: number;
  isUpdate: boolean;

  constructor(private dialogRef: MatDialogRef<DialogTodoComponent>, private todoService: TodoService,@Inject(MAT_DIALOG_DATA) data ) { 
    this.isUpdate=data.isUpdate;
    this.todoIndex=data.todoIndex;
    this.todoModel = data.todoModel;
    console.log("isUpdate =" + this.isUpdate)
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  updateTodo() {
    this.autoName();
    this.todoService.updateTodo(this.todoModel, this.todoIndex);
    //this.todoName="";
    this.close();
  }

  createTodo() {
    this.autoName();
    this.todoService.createTodo(this.todoModel);
    this.close();
  }

  autoName()
  {
    if(this.todoModel.name == undefined || this.todoModel.name == "")
    {
      this.todoModel.name = "New Todo List";
    }
  }
}
