import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import Swal from 'sweetalert2';
import { VehiculoA } from '../../interfaces/vehiculos.interface';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-card-alquilados',
  templateUrl: './card-alquilados.component.html',
  styleUrls: ['./card-alquilados.component.scss']
})
export class CardAlquiladosComponent implements OnInit {
  Autos!:VehiculoA
  searchText!:string
  constructor(private readonly vehiculoService:VehiculoService,private readonly sweetAlertService:SweetAlertService){}
  ngOnInit(): void {
    this.vehiculoService.vehiculosAlquilados().subscribe((data:any)=>{
      console.log(data)
      this.Autos=data.vehiculos
    })
  }
  onDelete(id:number):void{
    /* Swal.fire({
      title: 'Estas seguro?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }) */this.sweetAlertService.getAlertCondition().then((result) => {
      if (result.isConfirmed) {
      this.vehiculoService.deleteVehiculo(id).subscribe(data=>{
        this.sweetAlertService.getSuccess('Eliminado correctamente');
        /* Swal.fire({
          title: 'Eliminado correctamente.',
          width: 600,
          padding: '3em',
          color: '#716add',
          icon:'success',

        }); */

      })
      this.ngOnInit()
    }
  })
}
}
