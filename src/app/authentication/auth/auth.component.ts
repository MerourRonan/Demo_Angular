import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

//Class
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Input() user = new UserModel();

  errorAuth: boolean = false;
  creationSuccess: boolean = false;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkAlreadyLogged()) {
      this.router.navigate(['todo-view']);
    }
  }

  onSignIn() {
    console.log('Signing in !');
    this.authService.checkAuthentification(this.user).subscribe(res => {
      if (res) {
        this.router.navigate(['todo-view']);
      }
      else {
        this.errorAuth = true;
      }
    });
   /* console.log('Signing in !');
    if (this.authService.checkAuthentification(this.user)) {
      this.router.navigate(['todo-view']);
    }
    else {
      this.errorAuth = true;
    }*/
  }

  onCreateAccount() {
    /*console.log('Signing in !');
    if(this.authService.checkAuthentification(this.authId, this.authPassword))
    {
      this.errorAuth = true;
    }*/
  }

}
