import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone : true,
  imports: [FormsModule , CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isRegistered : boolean = false;
  
  constructor(private apiService: ApiService ,private router : Router , private activatedRoute : ActivatedRoute ) {}

  register() {
    const userData = { username: this.username, email: this.email, password: this.password };
    this.apiService.registerUser(userData).subscribe(
      response => {
        this.isRegistered = true;
        console.log('User registered successfully:', response);
        this.router.navigateByUrl('/login');
        this.errorMessage = ''; 
      },
      error => {
        console.error('Error registering user:', error);
        this.errorMessage = error.error.message || 'An error occurred during registration';
      }
    );
  }
}
