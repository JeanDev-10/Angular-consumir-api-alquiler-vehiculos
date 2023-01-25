import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableVehiculoComponent } from './components/table-vehiculo/table-vehiculo.component';

const routes: Routes = [
  {
    path: '',pathMatch:'full',
    redirectTo:'/dashboard'
  },
  {
    path: 'vehiculos',pathMatch:'full',
    component:TableVehiculoComponent
  },
  {
    path:'mis-vehiculos',pathMatch:'full',
    component:TableVehiculoComponent
  },
  {
    path:'vehiculos-alquilados',pathMatch:'full',
    component:TableVehiculoComponent
  },
  {
    path:'**',
    redirectTo:'/dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosRouting {}
