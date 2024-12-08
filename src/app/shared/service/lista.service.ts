import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../interface/naves.interface';


@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor() { }

  private dataArray = new BehaviorSubject<Result[]>((this.loadInitialData()));
  public dataArray$ = this.dataArray.asObservable();

  private loadInitialData(): Result[] {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  }
  private updateLocalStorage(data: Result[]): void {
    localStorage.setItem('data', JSON.stringify(data));
  }

  addData(items: Result[]): void {
    const currentData = this.dataArray.value;
    this.dataArray.next([...currentData, ...items]);
    this.updateLocalStorage([...currentData, ...items]);
  }

  getData(): Result[] {
    return this.dataArray.value;
  }


  removeAll(): void {
    this.dataArray.next([]);
    localStorage.removeItem('data');
  }
}
