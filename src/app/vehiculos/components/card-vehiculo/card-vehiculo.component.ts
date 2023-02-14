import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { VehiculoI, Vehiculo } from '../../interfaces/vehiculos.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserI } from 'src/app/auth/interface/user.interface';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
@Component({
  selector: 'app-card-vehiculo',
  templateUrl: './card-vehiculo.component.html',
  styleUrls: ['./card-vehiculo.component.scss'],
})
export class CardVehiculoComponent implements OnInit {
  searchText!: any;
  autos!: Vehiculo[];
  user!: UserI;
  constructor(
    private readonly vehiculoService: VehiculoService,
    private readonly authService: AuthService,
    private readonly sweetAlertService:SweetAlertService
  ) {}
  ngOnInit(): void {
    this.authService.userData().subscribe((user) => (this.user = user));
    this.vehiculoService.getVehiculos().subscribe((data: VehiculoI) => {
      console.log(data.vehiculos);
      this.autos = Object.values(data.vehiculos);
    });
  }
  onDelete(id: number): void {
    /* Swal.fire({
      title: 'Estas seguro?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }). */this.sweetAlertService.getAlertCondition().then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.deleteVehiculo(id).subscribe((data) => {
          console.log(data);
          this.sweetAlertService.getSuccess('Eliminado Correctamente');
          /* Swal.fire({
            title: 'Eliminado correctamente.',
            width: 600,
            padding: '3em',
            color: '#716add',
            icon:'success',

          }); */
        });
        this.ngOnInit();
      }
    });
  }
}
