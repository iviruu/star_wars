import { Component, OnInit } from '@angular/core';
import { NavesService } from '../../../shared/api/naves.service';
import { Naves } from '../../../shared/interface/naves.interface';
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
    private serviceNaves: NavesService,
    private route: ActivatedRoute,
    private lista: ListaService
  ){
    this.lista.dataArray$.subscribe(item=>{
      this.listaNaves = item;
      if(this.listaNaves){
              this.naves=this.listaNaves.flat();
              this.route.paramMap.subscribe(params=>{
                const starShipName = params.get('name');
                if(starShipName && this.naves){
                  const starship = this.naves.find(nav=> nav.name === starShipName);
                  this.starship = starship;
                  this.numberLast()
                  this.imagenImp()
                }
              })
            }
    })
  }

  naves?:Result[];
  listaNaves?:Result[];
  imagen:string='https://starwars-visualguide.com/assets/img/starships/';
  imagenError:string='https://starwars-visualguide.com/assets/img/placeholder.jpg'
  imgImp:string='';
  starship?:Result;
  lastNumber:string | null ='';

  ngOnInit(): void {
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
