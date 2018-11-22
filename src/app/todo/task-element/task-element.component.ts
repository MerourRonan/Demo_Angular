import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";

//Class
import { TaskModel } from '../../models/task-model';
import {DialogTaskComponent} from '../../dialog/dialog-task/dialog-task.component';

// Services
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() task: TaskModel;
  @Input() taskIndex: number;
  canBeModify: boolean = false;

  constructor(private todoService: TodoService,private dialog : MatDialog) { }

  ngOnInit() {
  }

  doneTask() {
    // la task a été faite
    this.task.isDone = !this.task.isDone;
    this.todoService.updateTask(this.task, this.taskIndex);
  }

  deleteTask() {
    this.todoService.deleteTask(this.taskIndex);
  }

  openDialogModifyTask()
  {
    console.log("open dialog for update task");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={
      isUpdate:true,
      taskIndex:this.taskIndex,
      taskModel:this.task
    };

    this.dialog.open(DialogTaskComponent, dialogConfig);
  }

}
