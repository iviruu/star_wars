import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit(data: any) {
    this.http.post('http://localhost:3000/login', data).subscribe({
      next: (response: any) => {
        const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

        localStorage.setItem('auth_token', response.accessToken);
        this.router.navigate([redirectUrl]);
        this.authService.redirectUrl= null;
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
