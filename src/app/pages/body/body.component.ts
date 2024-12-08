import { Component } from '@angular/core';
import { NavesComponent } from '../components/naves/naves.component';
import { PeliculasComponent } from '../components/peliculas/peliculas.component';
import { PilotosComponent } from '../components/pilotos/pilotos.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NavesComponent,PeliculasComponent,PilotosComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

}
