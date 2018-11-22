import {TaskModel} from '../models/task-model';

export class TodoModel {

	public id:number;
	public userId:number;
	public name:String;
	public tasks:TaskModel[];

	constructor(todoName:String){
		this.name = todoName;
		this.tasks = [];
	}

	changeName(name:String)
	{
		this.name = name;
	}

	addTask(task:TaskModel)
	{
		this.tasks.push(task);
	}

	deleteTask(index:number)
	{
		this.tasks.splice(index);
	}

	modifyTask(task:TaskModel, index:number)
	{
		this.tasks[index] = task;
	}
}
