import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {  VehiculoI } from '../../interfaces/vehiculos.interface';
import { VehiculoService } from '../../services/vehiculo.service';
@Component({
  selector: 'app-alquilar-vehiculo',
  templateUrl: './alquilar-vehiculo.component.html',
  styleUrls: ['./alquilar-vehiculo.component.scss'],
})
export class AlquilarVehiculoComponent implements OnInit {
  valor!:number
  fecha!:any
  vehiculoAlquilar!:any
  vehiculoAlquilerForm!:FormGroup
  constructor(
    private readonly route: ActivatedRoute,
    private readonly vehiculoService: VehiculoService,
    private readonly fb:FormBuilder,
    private readonly router:Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.vehiculoService.getVehiculo(params.id).subscribe((res:VehiculoI) => {
          this.vehiculoAlquilar=res.vehiculos
          if(this.vehiculoAlquilar.estado==0){
             this.router.navigate(['/dashboard/vehiculos']);
          }
          console.log(this.vehiculoAlquilar);
        });
      }
    });

    this.fecha=moment().format('YYYY-MM-DDThh:mm');;
    this.initForm()

  }
  alquilerVehiculo(id:number){
    if(this.vehiculoAlquilerForm.valid){
      const alquilar={
        vehiculo_id:this.vehiculoAlquilar.id,
        fecha_alquiler:this.vehiculoAlquilerForm.get('fecha_alquiler')?.value,
        tiempo_alquiler:this.vehiculoAlquilerForm.get('tiempo_alquiler')?.value,
        valor_alquiler:this.valor
      }
      console.log(alquilar)
      console.log("alquilar vehiculo"+id)
      this.vehiculoService.alquilarVehiculo(alquilar).subscribe(data=>{
        console.log(data)
        alert('alquilado correctamente')
        this.router.navigate(['/dashboard/mis-vehiculos']);
      })
    }
  }
  onInputHours(){
    const horas=this.calculateHours()
    if(horas<0){
      this.valor=horas*(-10);
    }else{
      alert('error de validacion')
      this.vehiculoAlquilerForm.reset();
    }
  }
  initForm(){
    this.vehiculoAlquilerForm=this.fb.group({
      'tiempo_alquiler':['',[Validators.required]],
      'fecha_alquiler':['',[Validators.required]],
    })
  }
  calculateHours():number{
    const fecha1 = moment(this.vehiculoAlquilerForm.get('tiempo_alquiler')?.value);
    const fecha2 = moment(this.vehiculoAlquilerForm.get('fecha_alquiler')?.value);
    const horas=fecha2.diff(fecha1, 'hours');
    return horas
  }
}
