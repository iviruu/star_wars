import { Component, OnInit } from '@angular/core';
import { NavesService } from '../../../shared/api/naves.service';
import { Naves } from '../../../shared/interface/naves.interface';
import { Result } from '../../../shared/interface/naves.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListaService } from '../../../shared/service/lista.service';


@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export class PeliculasComponent implements OnInit{

  constructor(
    private serviceNaves: NavesService,
    private route: ActivatedRoute,
    private lista: ListaService,
  ){}

  naves?:Result[];
  imagenError:string='https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
  imgImp:string='';
  starship?:Result;
  films?:string[];
  allFilms?: any[]
  sinFilm:string='No hay films.'

  ngOnInit(): void {
    this.lista.dataArray$.subscribe(item=>{
      this.naves = item;
      if(this.naves){
              this.route.params.subscribe(params=>{
                const starShipName = decodeURIComponent(params['name']);
                if(starShipName && this.naves){
                  const starship = this.naves.find(nav=> nav.name === starShipName);
                  this.starship = starship;
                  this.films= this.starship?.films
                }
              })
            }
            if(this.films){
              this.serviceNaves.multiUrl(this.films).subscribe({
              next:(results)=>{
                this.allFilms= results;
                this.numberLast();
              }
              })
            }
          }
    );
  }
  numberLast() {
    if (this.allFilms) {
      const newFilmUrls = this.allFilms.map(film => {
        const match = film.url.match(/\/(\d+)\/$/);
        if (match && match[1]) {
          return `https://starwars-visualguide.com/assets/img/films/${match[1]}.jpg`;
        } else {
          return film;
        }
      });
      this.films = newFilmUrls;
    }
  }
    
 imagenImp(i:number){
  if(this.films){
    this.imgImp=this.films[i]
    return this.imgImp
  }
  else {
    return ''
  }
 }
 imgError(){
  this.imgImp= this.imagenError
 }

 
 
}

