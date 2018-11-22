import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{NgForm} from '@angular/forms'

@Injectable()
export class AuthService {

	authStatus = new BehaviorSubject<boolean>(false);

	// id/password bouchon
	private idBouchon : string = "Bouchon";
	private passwordBouchon : string = "Bouchon";


  constructor( private router : Router, private httpClient: HttpClient) { 
  	console.log("loading authService");
  }

 checkAuthentification(inputId : string, inputPassword : string)
  {
  	if(this.idBouchon === inputId && this.passwordBouchon === inputPassword)
  	{
  		this.authStatus.next(true);
  		this.router.navigate(['todo']);
  	}
  	return this.authStatus.getValue();
  }

  createNewAccount(form : NgForm)
  {
    
    var newAccount =
    {
      user : form.value['user'],
      password : form.value['password']
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
      );
  }

logout()
{
	this.authStatus.next(false);
	this.router.navigate(['auth']);
}
   
}
