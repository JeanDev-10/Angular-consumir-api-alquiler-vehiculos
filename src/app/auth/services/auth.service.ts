import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { LoginI } from '../interface/login.interface';
import { RegisterI } from '../interface/register.interface';
import { UserI } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api=environment.baseUrl;
  constructor(private readonly http:HttpClient) { }
  register(userRegister:RegisterI):Observable<RegisterI>{
    return this.http.post<RegisterI>(this.api+"/register",userRegister);
  }
  login(userLogin:LoginI):Observable<LoginI>{
    return this.http.post<LoginI>(this.api+"/login",userLogin);
  }
  userData():Observable<UserI>{
    return this.http.get<UserI>(this.api+"/user-profile");
  }
  loggedIn():boolean {
    if (localStorage.getItem('token')) {
      return true
    }
    return false;
  }

  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    return localStorage.removeItem('token');
  }
  logout() {
     return this.http.post(this.api+"/logout",{});
  }
}
