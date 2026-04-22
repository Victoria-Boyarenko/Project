import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  errorMessage = '';
  loading = true;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('PROFILE INIT');

    const token = localStorage.getItem('access');
    console.log('TOKEN:', token);

    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.getProfile().subscribe({
      next: (data: UserProfile) => {
        console.log('SUCCESS PROFILE', data);
        this.profile = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('ERROR PROFILE', err);
        this.profile = null;
        this.errorMessage = 'Please login';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  openProduct(id: number): void {
    window.location.href = '/products';
  }
}