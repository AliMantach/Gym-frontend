import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone : true , 
  imports: [CommonModule , FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    const userData = { email: this.email, password: this.password };
    this.apiService.loginUser(userData).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.accessToken);
        this.errorMessage = ''; // Clear any previous error messages
        this.router.navigate(['/contacts']);
      },
      error => {
        console.error('Error logging in:', error);
        this.errorMessage = error.error.message || 'An error occurred during login';
      }
    );
  }
}
