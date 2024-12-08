import { Component, OnInit } from '@angular/core';
import { Result } from '../../../shared/interface/naves.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaService } from '../../../shared/service/lista.service';

@Component({
  selector: 'app-naves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './naves.component.html',
  styleUrl: './naves.component.scss'
})
export class NavesComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private lista: ListaService
  ){
  }

  listaNaves?:Result[];
  imagen:string='https://starwars-visualguide.com/assets/img/starships/';
  imagenError:string='https://starwars-visualguide.com/assets/img/placeholder.jpg'
  imgImp:string='';
  starship?:Result;
  lastNumber:string | null ='';

  ngOnInit(): void {
    this.lista.dataArray$.subscribe(item=>{
      this.listaNaves = item;
      if(this.listaNaves){
              this.route.params.subscribe(params=>{
                const starShipName = decodeURIComponent(params['name']);
                if(starShipName && this.listaNaves){
                  const starship = this.listaNaves.find(nav=> nav.name === starShipName);
                  this.starship = starship;
                  this.numberLast()
                  this.imagenImp()
                }
              })
            }
    })
  }
  numberLast(){
  if(this.starship){
    const match = this.starship.url.match(/\/(\d+)\/$/);
    this.lastNumber = match ? match[1]: null;
  }
 }
  imagenImp(){
  this.imgImp= this.imagen + this.lastNumber + '.jpg';
 }
  imgError(){
  this.imgImp= this.imagenError
 }
}
