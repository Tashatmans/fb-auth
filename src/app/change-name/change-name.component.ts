import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent {

  user:User
  constructor(private auth:AuthService,private router:Router){
    auth.user.subscribe(user => this.user=user)
  }

  onSubmit(form:NgForm){
    const displayName = form.value.displayName
    this.auth.updateProfile(this.user.token,displayName).subscribe(response => {
      if(response){
        this.router.navigateByUrl("/profile")
      }
    })
  }

}
