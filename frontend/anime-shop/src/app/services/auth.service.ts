import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginApi = 'http://127.0.0.1:8000/api/login/';
  private registerApi = 'http://127.0.0.1:8000/api/register/';
  private meApi = 'http://127.0.0.1:8000/api/me/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(this.loginApi, {
      username,
      password
    }).pipe(
      tap((tokens) => {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
      })
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(this.registerApi, {
      username,
      email,
      password
    }).pipe(
      tap((tokens) => {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
      })
    );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.meApi);
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }
}