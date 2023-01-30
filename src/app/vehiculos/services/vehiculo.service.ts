import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { DataAlquiler, MisVehiculoAlquiladosI, Vehiculo, VehiculoCreate, VehiculoI, VehiculosAlquiladosI } from '../interfaces/vehiculos.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private readonly api=environment.baseUrl;
  constructor(private http:HttpClient) { }
  getVehiculos():Observable<VehiculoI>{
    return this.http.get<VehiculoI>(this.api+"/vehiculos");
  }
  getVehiculo(id:number):Observable<VehiculoI>{
    return this.http.get<VehiculoI>(this.api+"/vehiculos/"+id);
  }
  postVehiculo(vehiculo:any):Observable<VehiculoCreate>{
    return this.http.post<VehiculoCreate>(this.api+"/vehiculos",vehiculo);
  }
  editVehiculo(vehiculo:Vehiculo,id:number):Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.api}/vehiculos/${id}`,vehiculo);
  }
  deleteVehiculo(id:number):Observable<Vehiculo>{
    return this.http.delete<Vehiculo>(`${this.api}/vehiculos/${id}`);
  }
  alquilarVehiculo(DatosAlquiler:DataAlquiler):Observable<any>{
    return this.http.post<any>(`${this.api}/vehiculos/alquilar`,DatosAlquiler)
  }
  misVehiculos():Observable<MisVehiculoAlquiladosI>{
    return this.http.get<MisVehiculoAlquiladosI>(`${this.api}/vehiculos/mis-alquilados`)
  }
  vehiculosAlquilados():Observable<VehiculosAlquiladosI>{
    return this.http.get<VehiculosAlquiladosI>(`${this.api}/vehiculos/alquilados`)
  }
  deleteAlquiler(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/vehiculos/alquilar/${id}`)
  }

}
