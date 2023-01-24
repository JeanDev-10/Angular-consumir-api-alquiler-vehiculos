import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRouting } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor} from './interceptor/auth-interceptor.';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRouting, HttpClientModule,ReactiveFormsModule],
  exports: [AuthRouting],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
})
export class AuthModule {}
