import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule , CommonModule],
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const loginData = { email: this.email, password: this.password };
    this.authService.login(loginData).subscribe(
      () => {
        console.log(loginData);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid login credentials';
        console.error('Login failed', error);
      }
    );
  }
}
