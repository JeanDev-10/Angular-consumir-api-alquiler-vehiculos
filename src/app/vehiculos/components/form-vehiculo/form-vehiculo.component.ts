import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../../interfaces/vehiculos.interface';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.scss'],
})
export class FormVehiculoComponent implements OnInit {
  img!: File;
  imageBlob: any = '';
  image: any;
  Vehiculo!: Vehiculo;
  vehiculoForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly vehiculoServicio: VehiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly sweetAlertService:SweetAlertService
  ) {}
  ngOnInit(): void {
    this.vehiculoForm = this.fb.group({
      modelo: ['', [Validators.required, Validators.minLength(5)]],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'),
        ],
      ],
      image: [''],
    });
    this.route.params.subscribe((params: any) => {
      if (params.vehiculo) {
        this.vehiculoServicio
          .getVehiculo(params.vehiculo)
          .subscribe((res: any) => {
            console.log(res.vehiculos);
            this.Vehiculo = res.vehiculos;
            this.image = res.vehiculos.url;
            this.vehiculoForm.setValue({
              modelo: res.vehiculos.modelo,
              marca: res.vehiculos.marca,
              image: '',
            });
          });
      }
    });
  }

  subiendo(event: any) {
    this.img = event.target.files[0];
    console.log(this.img);
    const reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = () => {
      this.image = reader.result;
    };
  }

  onSubmit(): void {
    if (this.vehiculoForm.valid) {
      let formdata: any = new FormData();
      formdata.append('modelo', this.vehiculoForm.get('modelo')?.value);
      formdata.append('marca', this.vehiculoForm.get('marca')?.value);
      if (this.img) {
        formdata.append('image', this.img);
      }
      if (this.Vehiculo?.id) {
        console.log('editar');
        this.vehiculoServicio
          .editVehiculo(formdata, this.Vehiculo.id)
          .subscribe((data: any) => {
            this.clearForm();
            this.sweetAlertService.getSuccess('Actualizado Correctamente');
            /* Swal.fire({
              title: 'Actualizado correctamente.',
              width: 600,
              padding: '3em',
              color: '#716add',
            }); */
            this.router.navigate(['dashboard/vehiculos']);
          });
      } else {
        console.log('create');
        this.vehiculoServicio.postVehiculo(formdata).subscribe((data: any) => {
          this.clearForm();
          this.sweetAlertService.getSuccess('Creado Correctamente');

         /*  Swal.fire({
            icon: 'success',
            title: 'Creado correctamente.',
            width: 600,
            padding: '3em',
            color: '#716add',
          }); */
          this.router.navigate(['dashboard/vehiculos']);
        });
      }
    } else {
      this.sweetAlertService.getError('Form no valido')
      /* Swal.fire({
        title: 'Form no valido.',
        icon: 'error',
      }); */
    }
  }
  clearForm() {
    this.vehiculoForm.reset();
  }
}
