import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';


@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,VehiculosModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
