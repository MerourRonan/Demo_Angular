import { Component, OnInit } from '@angular/core';
import{NgForm} from '@angular/forms'

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onNewUser(form: NgForm)
  {
  	console.log(form.value['user']);
    this.authService.createNewAccount(form);

  }

}
