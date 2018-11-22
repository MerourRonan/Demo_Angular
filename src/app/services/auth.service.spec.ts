import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user-model';

describe('AuthService', () => {

  let authService : AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    authService = new AuthService();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('Should return TRUE from checkAuthentification if the user/mdp is Bouchon/Bouchon', () => {
    let userModel = new UserModel();
    userModel.name = "Bouchon";
    userModel.password = "Bouchon";
    expect(authService.checkAuthentification(userModel)).toBeTruthy();
  });

  it('Should return FALSE from checkAuthentification if the user/mdp is different from Bouchon/Bouchon', ()=> {
    let userModel = new UserModel();
    userModel.name = "Bouchon";
    userModel.password = "test";
    expect(authService.checkAuthentification(userModel)).toBeFalsy();
  });

  it('Should return FALSE from checkAlreadyLogged if the user is not logged', ()=> {
    let userModel = new UserModel();
    userModel.name = "Bouchon";
    userModel.password = "test";
    authService.checkAuthentification(userModel);
    expect(authService.checkAlreadyLogged()).toBeFalsy();
  });

  it('Should return TRUE from checkAlreadyLogged if the user is logged', ()=> {
    let userModel = new UserModel();
    userModel.name = "Bouchon";
    userModel.password = "Bouchon";
    authService.checkAuthentification(userModel);
    expect(authService.checkAlreadyLogged()).toBeTruthy();
  });

  it('Should logout the user', ()=> {
    let userModel = new UserModel();
    userModel.name = "Bouchon";
    userModel.password = "Bouchon";
    authService.checkAuthentification(userModel);
    authService.logout()
    expect(authService.checkAlreadyLogged()).toBeFalsy();
  });

});
