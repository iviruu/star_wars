import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RegisterComponent,RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required] 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
    this.http.post('http://localhost:3000/login', this.loginForm.value).subscribe({
      next: (response: any) => {
        const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

        localStorage.setItem('auth_token', response.accessToken);
        this.router.navigate([redirectUrl]);
        this.authService.redirectUrl= null;
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage= error.error
      }
    });
  } else {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control?.errors && control?.touched && control.errors[errorName];
}
}

