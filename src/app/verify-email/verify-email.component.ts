import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {


  user: User


  constructor(private auth: AuthService, private router:Router) {
    if (this.auth.user) {
      auth.user.subscribe(userData => {
        this.user = userData
      })
    }
    else {
      auth.autoLogin()
    }
  }

  sendVerificationMail() {

this.auth.SendEmailVerification(this.user.token).subscribe(response => {
  if(response){
    this.router.navigateByUrl("/profile")
  }
})

  }


}
