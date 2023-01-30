import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MisVehiculoA, VehiculoA, VehiculosAlquiladosI } from '../../interfaces/vehiculos.interface';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-table-vehiculo-admin',
  templateUrl: './table-vehiculo-admin.component.html',
  styleUrls: ['./table-vehiculo-admin.component.scss']
})
export class TableVehiculoAdminComponent implements OnInit {
  alquilados!:VehiculoA[]
  searchText!:any
  constructor(private readonly vehiculoService:VehiculoService){}
  ngOnInit(): void {
    this.vehiculoService.vehiculosAlquilados().subscribe((data:VehiculosAlquiladosI)=>{
      this.alquilados=data.vehiculos
    })
  }

  verModal(id:any):void{
    console.log(id)
  }
  convertTime(fecha:any):string{
   /*  const moments=moment().endOf("hour").from(fecha) */
   let fecha1=moment()
   let fecha2=moment(fecha)
    const moments=fecha1.diff(fecha2,'days');
    if(moments==0){
      return fecha1.diff(fecha2,'hours')*-1+" horas"
    }
    return moments * -1 +" dias"
  }
  eliminarAlquilado(id:string){
    console.log(id)
    this.vehiculoService.deleteAlquiler(id).subscribe(data=>{
      alert('eliminado alquiler')
      this.ngOnInit()
    })
  }


}
