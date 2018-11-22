import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

// Services
import { TodoService } from '../../services/todo.service';

//Class
import { TaskModel } from '../../models/task-model';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css']
})
export class DialogTaskComponent implements OnInit {

 
  @Input() taskModel: TaskModel;
  @Input() taskIndex: number;
  isUpdate: boolean;

  constructor(private dialogRef: MatDialogRef<DialogTaskComponent>, private todoService: TodoService,@Inject(MAT_DIALOG_DATA) data ) { 
    this.isUpdate=data.isUpdate;
    this.taskIndex=data.taskIndex;
    this.taskModel = data.taskModel;
    console.log("isUpdate =" + this.isUpdate)
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  updateTask() {
    this.autoName();
    this.todoService.updateTask(this.taskModel, this.taskIndex);
    //this.todoName="";
    this.close();
  }

  createTask() {
    this.autoName();
    this.todoService.createTask(this.taskModel);
    this.close();
  }

  autoName()
  {
    if(this.taskModel.name == undefined || this.taskModel.name == "")
    {
      this.taskModel.name = "New Task";
    }
  }

}
