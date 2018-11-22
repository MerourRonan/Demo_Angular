import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserModel } from '../../models/user-model';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoViewComponent } from '../../todo/todo-view/todo-view.component';
import { AppModule } from '../../app.module'
import { RoutePageMockComponent } from '../../testing/route-page-mock/route-page-mock.component';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  class MockAuthService extends AuthService {
    checkAlreadyLogged() {
      return true;
    }

    checkAuthentification(userModel: UserModel) {
      console.log("checkAuthentification in MockAuthService");
      console.log("userModel.name = " + userModel.name);
      console.log("userModel.password = " + userModel.password);
      if (userModel.name == "OK" && userModel.password == "OK") {
        return true;
      }
      else {
        return false;
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutePageMockComponent, AuthComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService }],
      imports: [FormsModule, RouterTestingModule.withRoutes([{ path: 'todo-view', component: RoutePageMockComponent },])]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[id=name]'));
    passwordEl = fixture.debugElement.query(By.css('input[id=password]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "todo-view" if user already logged', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate').and.returnValue(true);
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['todo-view']);
  });

  it('should route to "todo-view" if user/password are correct', async(() => {
    fixture.whenStable().then(() => {
      let navigateSpy = spyOn((<any>component).router, 'navigate');
      loginEl.nativeElement.value = "OK";
      passwordEl.nativeElement.value = "OK";
      loginEl.nativeElement.dispatchEvent(new Event('input'));
      passwordEl.nativeElement.dispatchEvent(new Event('input'));
      submitEl.triggerEventHandler('click', null);

      expect(navigateSpy).toHaveBeenCalledWith(['todo-view']);
    });
  }));

  it('should display error message if user/password are not correct', async(() => {
    fixture.whenStable().then(() => {
      loginEl.nativeElement.value = "KO";
      passwordEl.nativeElement.value = "OK";
      loginEl.nativeElement.dispatchEvent(new Event('input'));
      passwordEl.nativeElement.dispatchEvent(new Event('input'));
      submitEl.triggerEventHandler('click', null);
      expect(component.errorAuth).toBeTruthy();
    });
  }));
});
