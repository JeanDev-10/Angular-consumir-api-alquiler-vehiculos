import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  isLoading$=new Subject<boolean>();
  show():void{
    this.isLoading$.next(true);
  }
  hide():void{
    this.isLoading$.next(false);
  }
}
