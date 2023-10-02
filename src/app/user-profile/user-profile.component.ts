import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { GetUserdataResponse } from '../models/get-userdata-response';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  user: User
  profiles: GetUserdataResponse
  userProfile: User
  model: any

  constructor(private auth: AuthService) {
    if (this.auth.user) {
      auth.user.subscribe(userData => {
        this.user = userData
        auth.getUserData(userData.token).subscribe(response => {
          if (response) {
            
            this.profiles = response

            const userData: Object = {
              ...response.users[0]
            }
            this.userProfile = userData as User
          }
        })
      })
    }
    else{
      auth.logOut()
    }
  }


}


