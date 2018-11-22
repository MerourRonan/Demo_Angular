import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//Services
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(private authService:AuthService, private router: Router )
	{

	}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.authStatus) {
      return true;
    } else {
      this.router.navigate(['auth']);
    }
  }
}
