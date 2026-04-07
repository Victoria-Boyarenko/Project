import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(this.api, {
      username,
      password
    }).pipe(
      tap((tokens) => {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
      })
    );
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