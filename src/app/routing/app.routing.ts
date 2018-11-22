import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Service
import {AuthGuardService} from '../services/auth-guard.service';

// Components
import { AuthComponent } from '../authentication/auth/auth.component';
import { FourOhFourComponent } from '../routing/four-oh-four/four-oh-four.component';
import { MessageViewComponent } from '../chat/message-view/message-view.component';
import { TodoViewComponent } from '../todo/todo-view/todo-view.component';
import { NewUserComponent } from '../authentication/new-user/new-user.component';


export const routes: Routes = [
    { path: 'message-view',canActivate:[AuthGuardService], component: MessageViewComponent },
    { path: 'todo-view',canActivate:[AuthGuardService], component: TodoViewComponent },
    { path: 'auth',component: AuthComponent },
    { path: 'new-user', component: NewUserComponent},
    { path: '',component: AuthComponent },
    { path : 'not-found', component : FourOhFourComponent},
    { path:'**', redirectTo:'not-found'}
  ];

export  const routing: ModuleWithProviders = RouterModule.forRoot(routes);