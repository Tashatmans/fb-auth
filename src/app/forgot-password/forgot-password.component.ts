import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  user:User
  constructor(private auth:AuthService,private router:Router){
    auth.user.subscribe(user => this.user=user)
  }

  onSubmit(form:NgForm){
    const email = form.value.email
    this.auth.sendPwResetEmail(email).subscribe(response => {
      if(response){
this.router.navigateByUrl("/login")
      }
    })
  }
}
