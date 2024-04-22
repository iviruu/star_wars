import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, forkJoin } from 'rxjs';
import { Naves } from '../interface/naves.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class NavesService {

  constructor( private http: HttpClient) { }

  url:string = "https://swapi.dev/api/starships/" ;
  url2:string ="https://swapi.py4e.com/api/starships/" ;
  getNaves(): Observable<Naves | undefined>{
    return this.http.get<Naves>(this.url).pipe(
      catchError((error)=> {
        console.log('Error fetching from primary URL, trying secondary URL...',error)
        return this.getNavesFromSecondaryUrl();
      }
    ))
  };
  private getNavesFromSecondaryUrl(): Observable<Naves | undefined> {
    return this.http.get<Naves>(this.url2).pipe(
      catchError((error) => {
        console.log('Error fetching from both primary and secondary URLs', error);
        return of(undefined); 
      })
    );
  }
  multiUrl(urls:string[]):Observable<any[]>{
    const requests = urls.map(url => this.http.get(url));
    return forkJoin(requests);
  }

  getNewStarships(url:string):Observable<Naves | undefined>{
    return this.http.get<Naves>(url);
  };
}
