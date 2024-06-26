import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authservice:AuthService) {}

  onSubmit(data: any) {
    this.http.post('http://localhost:3000/register', data).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage= error.error
      }
    });
  }
}
