import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './auth/guard/permission.guard';
import { Permission2Guard } from './auth/guard/permission2.guard';
import {  DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [Permission2Guard],
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [PermissionGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./vehiculos/vehiculos.module').then((m) => m.VehiculosModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
