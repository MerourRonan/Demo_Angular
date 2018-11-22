import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Class
import { TodoModel } from '../models/todo-model';
import { TaskModel } from '../models/task-model';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: TodoModel[] = [];
  todoListSubject = new Subject<TodoModel[]>();

  todoSelectedIndex: number;
  todoSelectedSubject = new Subject<TodoModel>();

  constructor(private authService: AuthService, private apiService: ApiService) {
    console.log('TodoService : constructing');
    console.log(this.authService.connectedUser);

    this.requestAllTodosFromServer(this.authService.connectedUser.id);
    this.authService.authStatusSubject.subscribe(
      authStatus => {
        if (authStatus)
          this.requestAllTodosFromServer(this.authService.connectedUser.id);
      }
    );
  }

  requestAllTodosFromServer(userId: number) {
    return this.apiService.requestUserTodos(userId).pipe(
      map(
        todos => {
          console.log('HTTP GET todos request success');
          this.todoList = todos;
          console.log(this.todoList[0])
          this.emitTodoListSubject();
        }),
      catchError(
        err => {
          console.log(err);
          return of(err);
        })).subscribe();
  }

  createTodo(todoModel: TodoModel) {
    this.todoList.push(todoModel);
    this.emitTodoListSubject();
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
    if (index == this.todoSelectedIndex) {
      this.todoSelectedIndex = undefined;
      this.emitTodoSelectedSubject();

    }
    this.emitTodoListSubject();

  }

  updateTodo(updatedTodo: TodoModel, index: number) {
    this.todoList[index] = updatedTodo;
    this.emitTodoListSubject();
    this.todoServerUpdate(updatedTodo);
  }

  selectTodo(index: number) {
    this.todoSelectedIndex = index;
    this.emitTodoSelectedSubject();
  }

  updateTask(task: TaskModel, taskIndex: number) {
    this.todoList[this.todoSelectedIndex].tasks[taskIndex] = task;
    this.emitTodoSelectedSubject();
  }

  deleteTask(taskIndex: number) {
    this.todoList[this.todoSelectedIndex].tasks.splice(taskIndex, 1);
    this.emitTodoSelectedSubject();
  }

  createTask(task: TaskModel) {
    this.todoList[this.todoSelectedIndex].tasks.push(task);
    this.emitTodoSelectedSubject();
  }

  todoServerUpdate(todo: TodoModel)
  {
    return this.apiService.updateTodo(todo).pipe(
      map(
        todo => {
          console.log('HTTP GET todos update success');
          console.log(todo);
        }),
      catchError(
        err => {
          console.log(err);
          return of(err);
        })).subscribe();
  }

  emitTodoListSubject() {
    this.todoListSubject.next(this.todoList.slice());
  }

  emitTodoSelectedSubject() {
    this.todoSelectedSubject.next(this.todoList[this.todoSelectedIndex]);
  }
}
