export class TaskModel {

	public id:number;
	public name: String;
	public isDone: Boolean;

	constructor(taskName: String) {
		this.name = taskName;
		this.isDone = false;
	}
}
