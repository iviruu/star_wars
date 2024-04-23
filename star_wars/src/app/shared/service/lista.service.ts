import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../interface/naves.interface';


@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor() { }

  private dataArray = new BehaviorSubject<Result[]>([]);
  public dataArray$ = this.dataArray.asObservable();

 addData(item: any) {
  const currentData = this.dataArray.value;
  this.dataArray.next([...currentData, item]);
}
getData() {
  return this.dataArray.value;
}
removeData(item: any) {
  const currentData = this.dataArray.value;
  const index = currentData.indexOf(item);
  if (index > -1) {
    currentData.splice(index, 1);
    this.dataArray.next([...currentData]);
  }
}
removeAll(){
  this.dataArray.next([]);
}
}
