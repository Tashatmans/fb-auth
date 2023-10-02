import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  user: User


  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.user) {
      auth.user.subscribe(userData => {
        this.user = userData
      })
    }
    else {
      auth.autoLogin()
    }
  }

  deleteAccount() {

    this.auth.deleteAccount(this.user.token).subscribe(response => {
      if (response) {
        this.auth.logOut
      }
    })

  }

}
