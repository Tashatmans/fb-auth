import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean = false

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  logOut(){
    this.auth.logOut()
  }

}
