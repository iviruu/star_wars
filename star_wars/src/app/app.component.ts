import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './entities/components/header/header.component';
import { NavbarComponent } from './entities/components/navbar/navbar.component';
import { StarshipsComponent } from './pages/starships/starships.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,NavbarComponent, StarshipsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'star_wars';
}
