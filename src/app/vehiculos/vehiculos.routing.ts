import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableVehiculoComponent } from './components/table-vehiculo/table-vehiculo.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosRouting {}
