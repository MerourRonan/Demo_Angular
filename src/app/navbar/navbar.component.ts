import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

//Class
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  connectedUser: UserModel;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.authStatusSubject.subscribe(
      (islogged: boolean) => { this.isAuth = islogged; }
    );

    this.authService.connectedUserSubject.subscribe(
      (user: UserModel) => { this.connectedUser = user; }
    );
  }

  ngOnInit() {

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

}
