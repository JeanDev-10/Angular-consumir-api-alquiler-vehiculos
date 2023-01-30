import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableVehiculoComponent } from './components/table-vehiculo/table-vehiculo.component';
import { VehiculosRouting } from './vehiculos.routing';
import { FormVehiculoComponent } from './components/form-vehiculo/form-vehiculo.component';
import { CardVehiculoComponent } from './components/card-vehiculo/card-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableVehiculoAdminComponent } from './components/table-vehiculo-admin/table-vehiculo-admin.component';
import { AlquilarVehiculoComponent } from './components/alquilar-vehiculo/alquilar-vehiculo.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    TableVehiculoComponent,
    FormVehiculoComponent,
    CardVehiculoComponent,
    TableVehiculoAdminComponent,
    AlquilarVehiculoComponent,
  ],
    imports: [CommonModule, VehiculosRouting,ReactiveFormsModule,Ng2SearchPipeModule,FormsModule],
  exports: [],
})
export class VehiculosModule {}
