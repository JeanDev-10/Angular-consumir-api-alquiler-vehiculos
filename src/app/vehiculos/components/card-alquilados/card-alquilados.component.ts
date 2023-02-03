import { Component, OnInit } from '@angular/core';
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
  constructor(private readonly vehiculoService:VehiculoService){}
  ngOnInit(): void {
    this.vehiculoService.vehiculosAlquilados().subscribe((data:any)=>{
      console.log(data)
      this.Autos=data.vehiculos
    })
  }
  onDelete(id:number):void{
    if(confirm('seguro que lo quieres eliminar?')){
      this.vehiculoService.deleteVehiculo(id).subscribe(data=>{
        alert('delete sucessfully')

      })
      this.ngOnInit()
    }

  }
}
