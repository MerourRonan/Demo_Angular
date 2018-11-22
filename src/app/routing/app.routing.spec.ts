import { fakeAsync, tick, async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { AppModule } from '../app.module';
import { routes } from './app.routing';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';



describe('Router : App', () => {
  let location: Location;
  let router: Router;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AuthGuardService],
      imports: [AppModule, RouterTestingModule.withRoutes(routes)]
    })
      .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    authService = TestBed.get(AuthService);
    router.initialNavigation();
  }));

  it('TEST 1 : navigate to "" redirects you to "/" if user not logged', fakeAsync(() => {
    router.navigate(['']);
    tick();
    console.log("location path = "+location.path());
    expect(location.path()).toBe('/');
  }));

  it('TEST 2 : navigate to "auth" redirects you to "/auth" if user not logged', fakeAsync(() => {
    router.navigate(['auth']);
    tick();
    console.log("location path = "+location.path());
    expect(location.path()).toBe('/auth');
  }));

  it('TEST 3 : navigate to "todo-view" redirects you to "/auth" if user not logged', fakeAsync(() => {
    router.navigate(['todo-view']);
    tick();
    expect(location.path()).toBe('/auth');
  }));

  it('TEST 4 : navigate to "message-view" redirects you to "/auth" if user not logged', fakeAsync(() => {
    router.navigate(['message-view']);
    tick();
    expect(location.path()).toBe('/auth');
  }));

  it('TEST 5 : navigate to "***" redirects you to "/not-found"', fakeAsync(() => {
    router.navigate(['blabla']);
    tick();
    expect(location.path()).toBe('/not-found');
  }));

  it('TEST 6 : navigate to "todo-view" redirects you to "/todo-view" if user is logged', fakeAsync(() => {
    
    authService.authStatus = true;
    console.log("TEST 6 : authService.authStatus.getValue() = " +authService.authStatus)
    router.navigate(['todo-view']);
    tick();
    expect(location.path()).toBe('/todo-view');
  }));

  it('TEST 7 : navigate to "message-view" redirects you to "/message-view" if user is logged', fakeAsync(() => {
    authService.authStatus = true;
    router.navigate(['message-view']);
    tick();
    expect(location.path()).toBe('/message-view');
  }));

});
