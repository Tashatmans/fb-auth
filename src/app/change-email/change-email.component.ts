import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {

  user:User
  constructor(private auth:AuthService,private router:Router){
    auth.user.subscribe(user => this.user=user)
  }

  onSubmit(form:NgForm){
    const email = form.value.email
    this.auth.verifyAndChangeEmail(this.user.token,email).subscribe(response => {
      if(response){
this.router.navigateByUrl("/profile")
      }
    })
  }

}
