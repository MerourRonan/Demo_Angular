import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

//Class
import {TodoModel} from '../../models/todo-model';
import {TaskModel} from '../../models/task-model';
import { DialogTaskComponent } from '../../dialog/dialog-task/dialog-task.component';

// Services
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

todoSelected : TodoModel;
@Input() newTaskName : String;

  constructor(private todoService:TodoService,private dialog: MatDialog) { 
  	this.todoService.todoSelectedSubject.subscribe(
  		(todoSelected:TodoModel)=>{
  			this.todoSelected=todoSelected;
  		}
  		);
  }

  ngOnInit() {
  }

  openDialogCreateTask() {
    console.log("open dialog");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isUpdate: false,
      taskModel:new TaskModel("")
    };

    this.dialog.open(DialogTaskComponent, dialogConfig);
  }

}
