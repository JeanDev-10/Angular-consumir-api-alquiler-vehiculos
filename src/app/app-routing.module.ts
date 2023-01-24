import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PermissionGuard } from './auth/guard/permission.guard';
import { Permission2Guard } from './auth/guard/permission2.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    canActivate: [Permission2Guard],
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
