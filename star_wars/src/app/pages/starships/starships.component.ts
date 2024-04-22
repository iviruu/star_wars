import { Component, HostListener, OnInit } from '@angular/core';
import { Result } from '../../shared/interface/naves.interface';
import { NavesService } from '../../shared/api/naves.service';
import { Naves } from '../../shared/interface/naves.interface';
import { Router } from '@angular/router';

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
  ){}

  starships?:Result[];
  currentPage = 1;
  loading= false;

  ngOnInit(): void {  
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
  }
  
  @HostListener('window:scroll',['$event'])

  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.loadMoreNombres();
    }
  }
  loadMoreNombres() {
    const url = `https://swapi.py4e.com/api/starships/?page=${++this.currentPage}`;
    this.serviceNaves.getNewStarships(url).subscribe(data => {
      this.starships = [...(this.starships || []), ...(data?.results || [])];
    });
  }
}
