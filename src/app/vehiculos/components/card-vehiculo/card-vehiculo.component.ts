import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { VehiculoI,Vehiculo } from '../../interfaces/vehiculos.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserI } from 'src/app/auth/interface/user.interface';
@Component({
  selector: 'app-card-vehiculo',
  templateUrl: './card-vehiculo.component.html',
  styleUrls: ['./card-vehiculo.component.scss']
})
export class CardVehiculoComponent implements OnInit {
  autos!:Vehiculo[];
  user!:UserI;
  constructor(private readonly vehiculoService:VehiculoService,
    private readonly authService:AuthService){}
  ngOnInit(): void {
    this.authService.userData().subscribe(user => this.user=user)
    this.vehiculoService.getVehiculos().subscribe((data:VehiculoI)=>{
      console.log(data.vehiculos)
      this.autos=Object.values(data.vehiculos)
    })

  }
  onDelete(id:number):void{
    this.vehiculoService.deleteVehiculo(id).subscribe(data=>{
      console.log(data)
    })
    alert('delete sucessfully')
    this.ngOnInit()
  }
  onUpdate():void{

  }
}
