import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/auth/interface/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  User:any=null
  constructor(private readonly authService:AuthService){}
  ngOnInit(): void {
    this.authService.userData().subscribe((data:any) => {
      this.User=data.user
      console.log(this.User)
    })
  }

}
