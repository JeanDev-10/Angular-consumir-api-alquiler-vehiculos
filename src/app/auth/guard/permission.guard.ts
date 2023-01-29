import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate  {
  constructor(private readonly authService:AuthService,
    private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("token guard")

    if(this.isLogin()){
      return true;
    }
    return false;
  }

  isLogin():boolean{
    if(this.authService.loggedIn()) {
      return true
    }
    console.log("redireccionar")
    this.router.navigate(['/auth/login']);
    return false;
  }

}
