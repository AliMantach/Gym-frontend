import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  isAdmin: boolean = true; // Set default value for isAdmin

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const adminData = { username: this.username, email: this.email, password: this.password, isAdmin: this.isAdmin };
    this.authService.register(adminData).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
