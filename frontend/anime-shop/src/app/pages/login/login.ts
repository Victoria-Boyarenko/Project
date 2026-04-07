import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Login successful';
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.successMessage = 'Logged out';
    this.errorMessage = '';
  }
}