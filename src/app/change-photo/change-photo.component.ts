import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css']
})
export class ChangePhotoComponent {

  user:User
  constructor(private auth:AuthService,private router:Router){
    auth.user.subscribe(user => this.user=user)
  }

  onSubmit(form:NgForm){
    const photoUrl = form.value.photoUrl
    console.log(form.value.photoUrl)
    this.auth.updateProfile(this.user.token,this.user.displayName,photoUrl).subscribe(response => {
      if(response){
        this.router.navigateByUrl("/profile")
      }
    })
  }

}
