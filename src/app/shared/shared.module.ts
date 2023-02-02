import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { SpinnerService } from './services/spinner.service';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

@NgModule({
  declarations: [NavComponent, SpinnerComponent, ViewProfileComponent],
  imports: [CommonModule,
  RouterModule],
  exports: [NavComponent,SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    SpinnerService
  ],
})
export class SharedModule {}
