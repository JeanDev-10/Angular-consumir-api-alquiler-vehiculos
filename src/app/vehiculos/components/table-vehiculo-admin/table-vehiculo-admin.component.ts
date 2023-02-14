import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import Swal from 'sweetalert2';
import {
  VehiculoA,
  VehiculosAlquiladosI,
} from '../../interfaces/vehiculos.interface';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-table-vehiculo-admin',
  templateUrl: './table-vehiculo-admin.component.html',
  styleUrls: ['./table-vehiculo-admin.component.scss'],
})
export class TableVehiculoAdminComponent implements OnInit {
  alquilados!: VehiculoA[];
  searchText!: any;
  constructor(private readonly vehiculoService: VehiculoService,
    private readonly sweetAlertService:SweetAlertService) {}
  ngOnInit(): void {
    this.vehiculoService
      .vehiculosAlquilados()
      .subscribe((data: VehiculosAlquiladosI) => {
        this.alquilados = data.vehiculos;
      });
  }

  convertTime(fecha: any, id: string): string {
    /*  const moments=moment().endOf("hour").from(fecha) */
    let fecha1 = moment();
    let fecha2 = moment(fecha);
    const moments = fecha1.diff(fecha2, 'days');
    if (moments == 0) {
      return fecha1.diff(fecha2, 'hours') * -1 + ' horas';
    }
    return moments * -1 + ' dias';
  }
  eliminarAlquilado(id: string) {
   /*  Swal.fire({
      title: 'Estas seguro?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }) */this.sweetAlertService.getAlertCondition().then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.deleteAlquiler(id).subscribe((data) => {
          this.sweetAlertService.getSuccess('Eliminado Correctamente')
          /* Swal.fire({
            title: 'Eliminado correctamente.',
            width: 600,
            padding: '3em',
            color: '#716add',
            icon:'success',

          }); */
          this.ngOnInit();
        });
      }
    });
  }
}
