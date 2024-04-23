import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{

  constructor(private http: HttpClient) {}
  
  onSubmit(data: any) {
    this.http.post('ocalhost:4200/register', data).subscribe({
      next: (response) => console.log('User registered', response),
      error: (error) => console.error('Error registering', error)
    });
  }
}
