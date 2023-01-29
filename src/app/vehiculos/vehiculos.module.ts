import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableVehiculoComponent } from './components/table-vehiculo/table-vehiculo.component';
import { VehiculosRouting } from './vehiculos.routing';
import { FormVehiculoComponent } from './components/form-vehiculo/form-vehiculo.component';
import { CardVehiculoComponent } from './components/card-vehiculo/card-vehiculo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableVehiculoAdminComponent } from './components/table-vehiculo-admin/table-vehiculo-admin.component';
import { AlquilarVehiculoComponent } from './components/alquilar-vehiculo/alquilar-vehiculo.component';

@NgModule({
  declarations: [
    TableVehiculoComponent,
    FormVehiculoComponent,
    CardVehiculoComponent,
    TableVehiculoAdminComponent,
    AlquilarVehiculoComponent,
  ],
  imports: [CommonModule, VehiculosRouting,ReactiveFormsModule],
  exports: [],
})
export class VehiculosModule {}
