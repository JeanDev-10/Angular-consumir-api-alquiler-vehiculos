import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private authService:AuthService,private router: Router){}
  logout(){
    this.authService.logout().subscribe((data:any)=>{
      localStorage.removeItem('token');
      console.log(data)
      this.router.navigate(['/auth/login']);
    })
  }
}
