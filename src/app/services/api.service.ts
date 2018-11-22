import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { TodoModel } from '../models/todo-model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  configUrl = '../../assets/config.json';
  config;

  constructor(private http: HttpClient) {
    this.getConfig().subscribe(data => this.config = {
      authUrl: data['authUrl'],
      backEndUrl: data['backEndServer'],
      userTodosUrl: data['userTodosUrl'],
      updateTodoUrl:data['updateTodoUrl']
    });
  }

  public requestAuth(user: UserModel): Observable<UserModel> {
    let URI=  this.config.backEndUrl + this.config.authUrl;
    return this.http.post<UserModel>(URI, user);
  }

  public requestUserTodos(userId: number): Observable<TodoModel[]> {
    console.log('requestUserTodos : start');
    console.log("user Id = "+userId);
    
    let URI = this.config.backEndUrl + this.config.userTodosUrl.replace('{userId}',userId.toString());
    console.log('requestUserTodos : URI = '+URI);
    return this.http.get<TodoModel[]>(URI);
  }

  public updateTodo(todo : TodoModel): Observable<TodoModel> {
    let URI=  this.config.backEndUrl + this.config.updateTodoUrl;
    console.log('updateTodo : URI = '+URI);
    return this.http.post<TodoModel>(URI, todo);
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
