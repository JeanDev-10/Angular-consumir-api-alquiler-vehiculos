import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableVehiculoComponent } from './components/table-vehiculo/table-vehiculo.component';
import { VehiculosRouting } from './vehiculos.routing';



@NgModule({
  declarations: [TableVehiculoComponent,],
  imports: [
    CommonModule,
    VehiculosRouting
  ],
  exports:[
  ]
})
export class VehiculosModule { }
