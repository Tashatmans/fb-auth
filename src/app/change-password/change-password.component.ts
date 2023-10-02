import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  user:User
  constructor(private auth:AuthService,private router:Router){
    auth.user.subscribe(user => this.user=user)
  }

  onSubmit(form:NgForm){

    const password = form.value.password
    this.auth.changePassword(this.user.token,password).subscribe(response => {
      if(response){
        this.router.navigateByUrl("/profile")
      }
    })
  }

}
