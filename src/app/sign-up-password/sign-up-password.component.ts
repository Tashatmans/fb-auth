import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up-password',
  templateUrl: './sign-up-password.component.html',
  styleUrls: ['./sign-up-password.component.css']
})
export class SignUpPasswordComponent {

  constructor(private auth:AuthService, private router:Router){}

  onSubmit(form:NgForm){
    if (form.invalid) {
      return
    }

    const email = form.value.email
    const password = form.value.password

    this.auth.signUpWithPassword(email,password).subscribe(response => {
      if(response){
        this.router.navigateByUrl("/profile")
      }
    })
  }

}
