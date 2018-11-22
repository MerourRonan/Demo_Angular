import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location, NgIf } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { AppModule } from '../app.module';
import { routes } from '../routing/app.routing';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from './navbar.component';
import { DebugElement } from '@angular/core';
import { UserModel } from '../models/user-model';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let location: Location;
  let router: Router;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [AppModule, RouterTestingModule.withRoutes(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

    authService.authStatus = true;
    authService.connectedUser.name = "Jean Test";
    authService.connectedUser.userPicture = "../../assets/userBouchonPicture.png";
    authService.emitAuthStatusSubject();
    authService.emitConnectedUserSubject();
    fixture.detectChanges();
  }));

  it('TEST 0 : Should create', () => {
    expect(component).toBeTruthy();
  });

  it('TEST 1 : Should suscribe to authStatusSubject and connectedUserSubject in AuthService', fakeAsync(() => {
    authService.authStatus = true;
    authService.connectedUser.name = "Bob Test";
    authService.connectedUser.userPicture = "../../assets/userBouchonPicture.png";
    authService.emitAuthStatusSubject();
    authService.emitConnectedUserSubject();
    tick();
    expect(component.isAuth).toBeTruthy();
    expect(component.connectedUser.name).toBe("Bob Test");
    expect(component.connectedUser.userPicture).toBe("../../assets/userBouchonPicture.png");
  }));

  it('TEST 2 : Should logout when click on "logoutLink"', fakeAsync(() => {
     let logoutEl: DebugElement = fixture.debugElement.query(By.css('#logoutLink'));
      
      logoutEl.triggerEventHandler('click', null);
      tick();
      expect(component.isAuth).toBeFalsy();
      expect(component.connectedUser.name).toBe(undefined);
      expect(component.connectedUser.userPicture).toBe(undefined);
  }));

  it('TEST 3 : Should route to "/auth" when click on "logoutLink" ', fakeAsync(() => {
    let logoutEl: DebugElement = fixture.debugElement.query(By.css('#logoutLink'));
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    logoutEl.triggerEventHandler('click', null);
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['auth']);
  }));

  it('TEST 4 : routerLinkTodo should have an href equal to /todo-view"', fakeAsync(() => {
    const href = fixture.debugElement.query(By.css('#routerLinkTodo')).nativeElement.getAttribute('href');
    console.log("href = " + href);
    expect(href).toEqual('/todo-view');
  }));

  it('TEST 5 : routerLinkMessage should have an href equal to /todo-view"', fakeAsync(() => {
    const href = fixture.debugElement.query(By.css('#routerLinkMessage')).nativeElement.getAttribute('href');
    console.log("href = " + href);
    expect(href).toEqual('/message-view');
  }));

  it('TEST 6 : Should display navbar if user is logged', () => {
    const navEl = fixture.debugElement.query(By.css('nav'));
    console.log("ngIf = " + navEl);
    expect(navEl).toBeTruthy();
  });

  /*it('TEST 7 : Should display user informations on HTML component', () => {
    expect(component).toBeTruthy();
  });*/
});
