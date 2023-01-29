import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { MisVehiculoA, MisVehiculoAlquiladosI } from '../../interfaces/vehiculos.interface';
import * as moment from 'moment';
@Component({
  selector: 'app-table-vehiculo',
  templateUrl: './table-vehiculo.component.html',
  styleUrls: ['./table-vehiculo.component.scss']
})
export class TableVehiculoComponent implements OnInit {
  alquilados!:MisVehiculoA[]
  constructor(private readonly vehiculoService:VehiculoService){}
  ngOnInit(): void {
    this.vehiculoService.misVehiculos().subscribe((vehiculos:MisVehiculoAlquiladosI)=>{
      this.alquilados=Object.values(vehiculos.vehiculos)
      this.alquilados.map(datos=>console.log(datos))
    })
  }
  convertTime(fecha:any):string{
    /*  const moments=moment().endOf("hour").from(fecha) */
    let fecha1=moment()
    let fecha2=moment(fecha)
     const moments=fecha1.diff(fecha2,'days');
     console.log(moments)
     if(moments==0){
       return fecha1.diff(fecha2,'hours')*-1+" horas"
     }
     return moments * -1 +" dias"
   }
}
