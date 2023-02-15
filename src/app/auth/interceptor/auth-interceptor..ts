import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService:AuthService,private router: Router,
    private readonly sweetAlertService:SweetAlertService) {}

  intercept(req: HttpRequest <any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token:string|null = this.authService.getToken();
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    console.log(token);
		return next.handle(request).pipe(catchError((error) => this.herrorHandler(error)));
	}

	private herrorHandler(error: HttpErrorResponse): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			if (error.error instanceof ErrorEvent) {
				console.error('ERROR DE CLIENTE', 'top right');
			} else {
        if(error.status===401){
          this.authService.deleteToken();
          console.log("redireccionar interceptor")
          this.sweetAlertService.getError('Sin permisos');

          this.router.navigate(['/auth/login']);
        }
				if (error.status !==200) {
          let mensaje:string="";
          console.error('ERROR DE SERVIDOR', 'top right');
          console.log(error.error)
          if(typeof(error.error)=='object'){
            console.log("es objeto se recorre y todo")
            Object.entries(error.error?.messages).forEach(([key, value]:any) => {
              mensaje+=value
            });
          this.sweetAlertService.getError(mensaje)
          }else{
            this.sweetAlertService.getError(error.error.messages)
          }
				}
			}
		} else {
			console.error('OTRO TIPO DE ERROR', 'top right');
		}
    this.router.navigate(['dashboard']);


		return throwError(error);
	}
}
