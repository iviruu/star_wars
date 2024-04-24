import { Component, OnInit } from '@angular/core';
import { NavesService } from '../../../shared/api/naves.service';
import { Naves } from '../../../shared/interface/naves.interface';
import { Result } from '../../../shared/interface/naves.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListaService } from '../../../shared/service/lista.service';


@Component({
  selector: 'app-pilotos',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './pilotos.component.html',
  styleUrl: './pilotos.component.scss'
})
export class PilotosComponent {

  constructor(
    private serviceNaves: NavesService,
    private route: ActivatedRoute,
    private lista:ListaService,
  ){}

  naves?:Result[];
  imagenError:string='https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
  imgImp:string='';
  starship?:Result;
  pilots?:string[];
  allPilots?: any[]
  sinPilotos:string='NO hay pilotos.'

  ngOnInit(): void {
    this.lista.dataArray$.subscribe(item=>{
      this.naves = item;
      if(this.naves){
              this.route.params.subscribe(params=>{
                const starShipName = decodeURIComponent(params['name']);
                if(starShipName && this.naves){
                  const starship = this.naves.find(nav=> nav.name === starShipName);
                  this.starship = starship;
                  this.pilots= this.starship?.pilots
                }
              })
            }
            if(this.pilots){
              this.serviceNaves.multiUrl(this.pilots).subscribe({
              next:(results)=>{
                this.allPilots= results;
                this.numberLast();
              }
              })
            }
          }
    );
  }
  numberLast() {
    if (this.allPilots) {
      const newPilotsUrls = this.allPilots.map(pilot => {
        const match = pilot.url.match(/\/(\d+)\/$/);
        if (match && match[1]) {
          return `https://starwars-visualguide.com/assets/img/characters/${match[1]}.jpg`;
        } else {
          return pilot;
        }
      });
      this.pilots = newPilotsUrls;
    }
  }
    
 imagenImp(i:number){
  if(this.pilots){
    this.imgImp=this.pilots[i]
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
