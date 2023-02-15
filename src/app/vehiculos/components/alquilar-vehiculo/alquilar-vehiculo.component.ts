import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import Swal from 'sweetalert2';
import { VehiculoI } from '../../interfaces/vehiculos.interface';
import { VehiculoService } from '../../services/vehiculo.service';
@Component({
  selector: 'app-alquilar-vehiculo',
  templateUrl: './alquilar-vehiculo.component.html',
  styleUrls: ['./alquilar-vehiculo.component.scss'],
})
export class AlquilarVehiculoComponent implements OnInit {
  valor: number = 0;
  fecha!: any;
  vehiculoAlquilar!: any;
  vehiculoAlquilerForm!: FormGroup;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly vehiculoService: VehiculoService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly sweetAlertService: SweetAlertService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.vehiculoService
          .getVehiculo(params.id)
          .subscribe((res: VehiculoI) => {
            this.vehiculoAlquilar = res.vehiculos;
            if (this.vehiculoAlquilar.estado == 0) {
              this.sweetAlertService.getError('Vehiculo ya alquilado');
              this.router.navigate(['dashboard/vehiculos']);
            }
            console.log(this.vehiculoAlquilar);
          });
      }
    });

    this.fecha = moment().format('YYYY-MM-DDThh:mm');
    this.initForm();
  }
  alquilerVehiculo(id: number) {
    if (this.vehiculoAlquilerForm.valid) {
      const alquilar = {
        vehiculo_id: this.vehiculoAlquilar.id,
        fecha_alquiler: this.vehiculoAlquilerForm.get('fecha_alquiler')?.value,
        tiempo_alquiler:
          this.vehiculoAlquilerForm.get('tiempo_alquiler')?.value,
        valor_alquiler: this.valor,
      };
      console.log(alquilar);
      console.log('alquilar vehiculo' + id);
      this.vehiculoService.alquilarVehiculo(alquilar).subscribe((data) => {
        console.log(data);
        this.sweetAlertService.getSuccess('Alquilado correctamente');

        this.router.navigate(['dashboard/mis-vehiculos']);
      });
    }
  }
  onInputHours() {
    const actual: any = moment();
    if (
      moment(this.vehiculoAlquilerForm.get('fecha_alquiler')?.value).diff(
        actual._d,
        'days'
      ) < 0
    ) {
      console.log('salta validacion de dias');
      this.sweetAlertService.getError('Inserte datos correctos');
      this.vehiculoAlquilerForm.reset();
      this.valor = 0;
    } else if (
      moment(this.vehiculoAlquilerForm.get('fecha_alquiler')?.value).diff(
        actual._d,
        'hours'
      ) < 0
    ) {
      console.log('salta validacion de horas');
      this.sweetAlertService.getError('Inserte datos correctos');
      this.vehiculoAlquilerForm.reset();
      this.valor = 0;
    } else if (
      moment(this.vehiculoAlquilerForm.get('fecha_alquiler')?.value).diff(
        actual._d,
        'minutes'
      )<0
    ) {
      console.log(moment(this.vehiculoAlquilerForm.get('fecha_alquiler')?.value).diff(
        actual._d,
        'minutes'));
      console.log('salta validacion de minutos');
      this.sweetAlertService.getError('Inserte datos correctos');
      this.vehiculoAlquilerForm.reset();
      this.valor = 0;
    } else if (
      this.vehiculoAlquilerForm.get('fecha_alquiler')?.value &&
      this.vehiculoAlquilerForm.get('tiempo_alquiler')?.value
    ) {
      const horas = this.calculateHours();
      if (horas < 0) {
        this.valor = horas * -10;
      } else {
        this.sweetAlertService.getError('Inserte datos correctos');
        /* alert('inserte fechas validas') */
        this.vehiculoAlquilerForm.reset();
        this.valor = 0;
        this.vehiculoAlquilerForm.reset();
      }
    }
  }
  initForm() {
    this.vehiculoAlquilerForm = this.fb.group({
      tiempo_alquiler: ['', [Validators.required]],
      fecha_alquiler: ['', [Validators.required]],
    });
  }
  calculateHours(): number {
    const fecha1 = moment(
      this.vehiculoAlquilerForm.get('tiempo_alquiler')?.value
    );
    const fecha2 = moment(
      this.vehiculoAlquilerForm.get('fecha_alquiler')?.value
    );
    const horas = fecha2.diff(fecha1, 'hours');
    return horas;
  }
}
