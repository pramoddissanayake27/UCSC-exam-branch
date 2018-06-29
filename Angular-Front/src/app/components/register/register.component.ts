import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {state} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {}

  registerData(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe(res => {

        this.flashMessage.show('Registration Successful!', {cssClass: 'alert-success', timeout: 2000}); //setting a flash message to display that registration succeeded.
        this.router.navigate(['/login']); //if successful go back to login page
    })


  }

}
