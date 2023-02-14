import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/auth/interface/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() user!:UserI;
  constructor(private authService:AuthService,private router: Router){}
  logout(){
    this.authService.logout().subscribe((data:any)=>{
      localStorage.removeItem('token');
      Swal.fire({
        title: 'Deslogeado correctamente.',
        width: 600,
        icon:'success',
        padding: '3em',
        color: '#716add',
      })
      this.router.navigate(['auth/login']);
    })
  }
}
