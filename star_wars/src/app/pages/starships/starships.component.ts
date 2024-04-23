import { Component, HostListener, OnInit } from '@angular/core';
import { Result } from '../../shared/interface/naves.interface';
import { NavesService } from '../../shared/api/naves.service';
import { Naves } from '../../shared/interface/naves.interface';
import { Router } from '@angular/router';
import { ListaService } from '../../shared/service/lista.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {
  
  constructor(
    private serviceNaves: NavesService,
    private router:Router,
    private lista: ListaService,
  ){

  
  }

  starships?:Result[];
  currentPage:number=0

  ngOnInit(): void {
    this.currentPage=0;
    this.lista.removeAll();
    this.serviceNaves.getNaves().subscribe({
      next:(nav:Naves | undefined) =>{
        if(nav){
          this.starships=nav.results.flat();
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
  starshipDetails(nav:Result){
    this.router.navigate(['/starships', nav.name]);
    this.lista.addData(this.starships);
  }
  
  @HostListener('window:scroll',['$event'])

  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.currentPage++
      this.loadMoreNombres(this.currentPage);
    }
  }
  loadMoreNombres(i:number) {
    if(i<=4){
        this.serviceNaves.getScroll(i).subscribe(data => {
        this.starships = [...(this.starships || []), ...(data?.results || [])];
    });
    }
  }
  
}
