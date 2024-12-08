import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(
    private router: Router,
    private authservice: AuthService,
  ){}
  acces:boolean=false

ngOnInit(): void {
  this.tokken()
}

  login(){
    this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/register'])
  }
  logout(){
    this.authservice.logout()
  }
  tokken(){
    if(this.authservice.isAuthenticated()){
      this.acces=true
      return this.acces
    }else{
      return this.acces
    }
    
  }
}
