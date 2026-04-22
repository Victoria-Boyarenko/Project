import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  
  loginUsername = '';
  loginPassword = '';

  registerUsername = '';
  registerEmail = '';
  registerPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginUsername, this.loginPassword).subscribe({
      next: () => {
        this.successMessage = 'Login successful';
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.errorMessage = 'Wrong username or password';
      }
    });
  }

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(
      this.registerUsername,
      this.registerEmail,
      this.registerPassword
    ).subscribe({
      next: () => {
        this.successMessage = 'Registration successful';
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.errorMessage = 'Registration failed';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.successMessage = 'Logged out';
  }
}