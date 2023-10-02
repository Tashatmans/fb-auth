import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-password',
  templateUrl: './sign-in-password.component.html',
  styleUrls: ['./sign-in-password.component.css']
})
export class SignInPasswordComponent {

  constructor(private auth:AuthService, private router:Router){}

  onSubmit(form:NgForm){
    if (form.invalid) {
      return
    }

    const email = form.value.email
    const password = form.value.password

    this.auth.signInWithPassword(email,password).subscribe(response => {
      if(response){
        this.router.navigateByUrl("/profile")
      }
    })
  }

}
