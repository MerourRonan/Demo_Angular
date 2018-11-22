import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms'

//Class
import { UserModel } from '../models/user-model';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  public connectedUser: UserModel;
  public authStatus: boolean;
  public connectedUserSubject = new Subject<UserModel>();
  public authStatusSubject = new Subject<boolean>();


  // id/password bouchon
  public idBouchon: string = "Bouchon";
  public passwordBouchon: string = "Bouchon";


  constructor(private apiService: ApiService) {
    this.authStatus = false;
    this.connectedUser = new UserModel();
  }

  checkAuthentification(userModel: UserModel): Observable<boolean> {
    return this.apiService.requestAuth(userModel).pipe(
      map(
        userAuth => {
          console.log("HTTP POST user success");
          this.connectedUser = userAuth;
          this.authStatus = true;
          this.emitAuthStatusSubject();
          this.emitConnectedUserSubject();
          return true;
        }),
      catchError(
        err => {
          this.authStatus = false;
          console.log("checkAuthentification : error");
          console.log(err);
          this.emitAuthStatusSubject();
          return of(false);
        }));
  }

  checkAlreadyLogged() {
    return this.authStatus;
  }

  createNewAccount(form: NgForm) {

    /*var newAccount =
    {
      user: form.value['user'],
      password: form.value['password']
    };
    console.log(newAccount);
    this.httpClient
      .post('http://localhost:8080/api/user', newAccount)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
  }

  logout() {
    this.authStatus = false;
    this.connectedUser = new UserModel();
    this.emitAuthStatusSubject();
    this.emitConnectedUserSubject();
  }

  emitAuthStatusSubject() {
    this.authStatusSubject.next(this.authStatus);
  }

  emitConnectedUserSubject() {
    this.connectedUserSubject.next(this.connectedUser);
  }

}
