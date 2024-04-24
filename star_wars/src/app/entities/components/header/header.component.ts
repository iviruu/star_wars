import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authservice: AuthService,
  ){}

  login(){
    this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/register'])
  }
  logout(){
    this.authservice.logout()
  }
}
