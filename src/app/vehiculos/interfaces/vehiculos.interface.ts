export interface VehiculoI {
  vehiculos: Vehiculo[]|Vehiculo
}

export interface Vehiculo {
  id:        number;
  marca:     string;
  modelo:    string;
  public_id: string;
  url:       string;
  estado:    number;
}
export interface VehiculoCreate {
  marca:     string;
  modelo:    string;
  image:  string;
}

export interface DataAlquiler{
  vehiculo_id:number,
  fecha_alquiler:Date,
  tiempo_alquiler:Date,
  valor_alquiler:number
}

export interface MisVehiculoAlquiladosI {
  vehiculos: MisVehiculoA[]|MisVehiculoA;
}

export interface MisVehiculoA {
  id:string;
  fecha_alquiler:  Date;
  tiempo_alquiler: Date;
  marca_vehiculo:  string;
  modelo_vehiculo: string;
  url_vehiculo:    string;
  precio_pagar:    number;
}

export interface VehiculosAlquiladosI {
  vehiculos: VehiculoA[];
}

export interface VehiculoA {
  id:string,
  nombre_usuario:  string;
  cedula_usuario:  string;
  email_usuario:   string;
  fecha_alquiler:  Date;
  tiempo_alquiler: Date;
  marca_vehiculo:  string;
  modelo_vehiculo: string;
  url_vehiculo:    string;
  precio_pagar:    number;
}
