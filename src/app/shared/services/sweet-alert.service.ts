import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  getSuccess(texto:string){
    return Swal.fire({
      title: texto,
      width: 600,
      padding: '3em',
      color: '#716add',
      icon:'success',
    });
  }
  getError(texto:string){
    return Swal.fire({
      title: texto,
      width: 600,
      padding: '3em',
      color: '#716add',
      icon:'error',
    });
  }
  getAlertCondition(){
    return Swal.fire({
      title: 'Estas seguro?',
      text: "No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    })
  }
}
