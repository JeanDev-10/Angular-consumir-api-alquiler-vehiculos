import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/auth/interface/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user!:UserI;
  constructor(private readonly authService:AuthService){}
  ngOnInit(): void {
    this.authService.userData().subscribe((data:UserI)=>{
      this.user=data;
      console.log(this.user)
    });
  }

}
