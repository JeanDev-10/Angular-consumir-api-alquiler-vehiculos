import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VehiculoGuardGuard implements CanActivate {
  role!: string;
  constructor(
    private readonly authService: AuthService,
    private readonly router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log("admin guard")

    if (this.permission()) {
      return true;
    }
    return false;
  }
  permission(): boolean {
    this.authService.userData().subscribe((data) => {
      this.role = data.user.rol;

    });
    if (this.role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/dashboard'])
      return false;
    }

  }
}
