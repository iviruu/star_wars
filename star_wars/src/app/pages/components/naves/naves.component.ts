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

  naves?:Result[];
  listaNaves?:Result[];
  imagen:string='https://starwars-visualguide.com/assets/img/starships/';
  imagenError:string='https://starwars-visualguide.com/assets/img/placeholder.jpg'
  imgImp:string='';
  starship?:Result;
  lastNumber:string | null ='';

  ngOnInit(): void {
    this.lista.dataArray$.subscribe(item=>{
      console.log('item', item)
      this.listaNaves = item;
      if(this.listaNaves){
              this.route.paramMap.subscribe(params=>{
                const starShipName = params.get('name')?.replace(/[^a-zA-Z0-9 ]/g, "");

                console.log('nombre', starShipName)
                if(starShipName && this.listaNaves){
                  console.log('nave', this.naves)
                  const starship = this.listaNaves.find(nav=> nav.name === starShipName);
                  this.starship = starship;
                  console.log('starship', this.starship)
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
